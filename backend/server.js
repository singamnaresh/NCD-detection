
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const csv = require("csv-parser");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors());

require("dotenv").config();

app.get("/", (req, res) => {
  res.send("NCD Detection Backend is running 🚀");
});



let foodData = [];

// ✅ Load CSV Data
fs.createReadStream("sorted_food_nutrient_ncd_dataset.csv")
    .pipe(csv())
    .on("data", (row) => {
        if (
            row["Food Category"] &&
            row["Food Name"] &&
            row["Nutrient"] &&
            row["Amount per 100g"] &&
            row["Safe Limit"] &&
            row["Associated NCD"]
        ) {
            foodData.push(row);
        }
    })
    .on("end", () => {
        console.log(`✅ CSV data loaded successfully (${foodData.length} rows)`);
    })
    .on("error", (err) => {
        console.error("❌ Error loading CSV file:", err.message);
    });

// ✅ Get Food Categories
app.get("/categories", (req, res) => {
    try {
        const categories = [...new Set(foodData.map(item => item["Food Category"].trim()))];
        if (categories.length === 0) throw new Error("No categories found");
        res.json(categories);
    } catch (error) {
        console.error("❌ Error fetching categories:", error.message);
        res.status(500).json({ error: "Failed to load categories" });
    }
});

// ✅ Get Food Items by Category (GET)
app.get("/foods", (req, res) => {
    try {
        if (!req.query.category) {
            return res.status(400).json({ error: "Category is required" });
        }
        const category = decodeURIComponent(req.query.category.trim().toLowerCase());

        const filteredFoods = foodData
            .filter(item => item["Food Category"].trim().toLowerCase() === category)
            .map(item => item["Food Name"].trim());

        if (filteredFoods.length === 0) {
            return res.status(404).json({ error: "No foods found for this category" });
        }

        res.json([...new Set(filteredFoods)]);
    } catch (error) {
        console.error("❌ Error fetching foods:", error.message);
        res.status(500).json({ error: "Failed to load foods" });
    }
});

// ✅ Get Food Items by Category (POST)
app.post("/foods", (req, res) => {
    try {
        const { category } = req.body;
        if (!category) return res.status(400).json({ error: "Category is required" });

        const filteredFoods = foodData
            .filter(item => item["Food Category"].trim().toLowerCase() === category.trim().toLowerCase())
            .map(item => item["Food Name"].trim());

        if (filteredFoods.length === 0) {
            return res.status(404).json({ error: "No foods found for this category" });
        }

        res.json([...new Set(filteredFoods)]);
    } catch (error) {
        console.error("❌ Error fetching foods:", error.message);
        res.status(500).json({ error: "Failed to load foods" });
    }
});




app.post("/calculate-intake", (req, res) => {
    try {
        const { items } = req.body;

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: "A list of food items with quantity is required." });
        }

        const totalIntake = {};
        const safeLimits = {};
        const safeLimitUnits = {};
        const associatedNCDs = {};

        const allNutrients = new Set(foodData.map(item => item["Nutrient"]));
        for (const nutrient of allNutrients) {
            totalIntake[nutrient] = 0;
        }

        // IU and other conversion logic
        const convertIU = (nutrient, value) => {
            if (nutrient.toLowerCase().includes("vitamin a")) {
                return value / 3.33; // IU to mcg RAE
            } else if (nutrient.toLowerCase().includes("vitamin d")) {
                return value * 0.025; // IU to mcg
            }
            return value; // no conversion if it's not IU
        };

        // Conversion of safe limits to mg if needed
        const convertToMg = (nutrient, value, unit) => {
            if (unit === "g") {
                return value * 1000; // g to mg
            } else if (unit === "mcg") {
                return value / 1000; // mcg to mg
            }
            return value; // assume the value is already in mg
        };

        items.forEach(({ food, quantity }) => {
            const filteredItems = foodData.filter(item => item["Food Name"].trim().toLowerCase() === food.trim().toLowerCase());

            filteredItems.forEach(item => {
                const nutrient = item["Nutrient"];
                const amountPer100g = parseFloat(item["Amount per 100g"]);
                const intake = (amountPer100g * quantity) / 100;
                const unit = item["Unit"];
                const safeLimitRaw = parseFloat(item["Toxicity Limit"]);

                if (!isNaN(intake)) {
                    // Convert intake if the unit is IU
                    const convertedIntake = unit === "IU" ? convertIU(nutrient, intake) : intake;

                    // Add to total intake
                    totalIntake[nutrient] += convertedIntake;
                }

                if (!safeLimits[nutrient] && !isNaN(safeLimitRaw)) {
                    // Convert safe limit to mg if necessary
                    const convertedLimit = unit === "IU" ? convertIU(nutrient, safeLimitRaw) : safeLimitRaw;
                    const convertedLimitInMg = convertToMg(nutrient, convertedLimit, item["Unit"]);

                    safeLimits[nutrient] = convertedLimitInMg;
                    safeLimitUnits[nutrient] = "mg"; // Store units as mg
                    associatedNCDs[nutrient] = item["Associated NCD"];
                }
            });
        });

        // Now compare total intake and safe limits in mg
        const exceededNutrients = Object.keys(totalIntake).filter(nutrient => {
            return safeLimits[nutrient] && totalIntake[nutrient] > safeLimits[nutrient];
        });

        res.json({
            totalItems: items.length,
            foodList: items,
            exceededNutrients,
            intakeValues: totalIntake,
            safeLimits,
            safeLimitUnits,
            associatedNCDs
        });

    } catch (error) {
        console.error("❌ Error calculating total intake:", error.message);
        res.status(500).json({ error: "Failed to calculate total nutrient intake." });
    }
});



// ✅ Get NCD Information
app.get("/ncd-info", (req, res) => {
    try {
        let ncdInfo = {};

        foodData.forEach(item => {
            let ncd = item["Associated NCD"].trim();
            if (!ncdInfo[ncd]) {
                ncdInfo[ncd] = { riskNutrients: new Set(), recommendedFoods: new Set() };
            }
            ncdInfo[ncd].riskNutrients.add(item["Nutrient"].trim());
            ncdInfo[ncd].recommendedFoods.add(item["Food Name"].trim());
        });

        // Convert Sets to Arrays
        Object.keys(ncdInfo).forEach(ncd => {
            ncdInfo[ncd].riskNutrients = [...ncdInfo[ncd].riskNutrients];
            ncdInfo[ncd].recommendedFoods = [...ncdInfo[ncd].recommendedFoods];
        });

        res.json(ncdInfo);
    } catch (error) {
        console.error("❌ Error fetching NCD info:", error.message);
        res.status(500).json({ error: "Failed to load NCD info" });
    }
});





app.post("/chatbot", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `
You are an AI nutrition assistant like ChatGPT.

Guidelines:
- Explain answers in a friendly, conversational tone
- Use short paragraphs or bullet points when helpful
- Include nutritional benefits, key nutrients, and health effects
- Relate food to common Non-Communicable Diseases (NCDs) when relevant
- Avoid being too short; give informative but simple explanations
`

 },
          {
            role: "user",
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 650
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "Nutrition Analysis Chatbot"
        }
      }
    );

    res.json({
      response: response.data.choices[0].message.content
    });

  } catch (error) {
    console.error("OpenRouter Error:", error.response?.data || error.message);
    res.status(500).json({ response: "Chatbot service unavailable" });
  }
});





const path = require("path");

// Serve React build
app.use(express.static(path.join(__dirname, "build")));

// React routing (SPA)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Dynamic port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

