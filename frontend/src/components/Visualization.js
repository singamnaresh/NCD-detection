// // // // // import React, { useEffect, useState } from "react";
// // // // // import { useLocation } from "react-router-dom";
// // // // // import "./Visualization.module.css";
// // // // // import axios from "axios";


// // // // // const Visualization = () => {
// // // // //     const location = useLocation();
// // // // //     const { selectedFood, quantity } = location.state || {};
// // // // //     const [data, setData] = useState(null);

// // // // //     useEffect(() => {
// // // // //         if (selectedFood && quantity) {
// // // // //             axios.post("http://localhost:5000/calculate-intake", { food: selectedFood, quantity })
// // // // //                 .then(response => setData(response.data))
// // // // //                 .catch(error => console.error("Error fetching intake data:", error));
// // // // //         }
// // // // //     }, [selectedFood, quantity]);

// // // // //     return (
// // // // //         <div>
// // // // //             <h2>Visualization</h2>
// // // // //             {data ? (
// // // // //                 <>
// // // // //                     <p><strong>Food:</strong> {data.food}</p>
// // // // //                     <p><strong>Quantity:</strong> {data.quantity}g</p>
// // // // //                     <p><strong>Exceeded Nutrients:</strong> {data.exceededNutrients.join(", ")}</p>
// // // // //                     <p><strong>Associated NCDs:</strong> {data.associatedNCDs.join(", ")}</p>
// // // // //                 </>
// // // // //             ) : (
// // // // //                 <p>Loading...</p>
// // // // //             )}
// // // // //         </div>
// // // // //     );
// // // // // };

// // // // // export default Visualization;
// // // // // import React, { useEffect, useState } from "react";
// // // // // import styles from "./Visualization.module.css"; // Correct import

// // // // // const Visualization = () => {
// // // // //   const [data, setData] = useState(null);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [error, setError] = useState(null);

// // // // //   useEffect(() => {
// // // // //     fetch("http://localhost:5000/ncd-info") // Update with correct API endpoint
// // // // //       .then((response) => {
// // // // //         if (!response.ok) {
// // // // //           throw new Error("Failed to fetch NCD data");
// // // // //         }
// // // // //         return response.json();
// // // // //       })
// // // // //       .then((data) => {
// // // // //         setData(data);
// // // // //         setLoading(false);
// // // // //       })
// // // // //       .catch((err) => {
// // // // //         setError(err.message);
// // // // //         setLoading(false);
// // // // //       });
// // // // //   }, []);

// // // // //   return (
// // // // //     <div className={styles.container}>
// // // // //       <h2 className={styles.heading}>NCD Risk Visualization</h2>

// // // // //       {loading ? (
// // // // //         <p className={styles.loading}>Loading...</p>
// // // // //       ) : error ? (
// // // // //         <p className={styles.error}>{error}</p>
// // // // //       ) : (
// // // // //         <div className={styles.content}>
// // // // //           {Object.keys(data).map((ncd) => (
// // // // //             <div key={ncd} className={styles.ncdCard}>
// // // // //               <h3>{ncd}</h3>
// // // // //               <p>
// // // // //                 <strong>Risk Nutrients:</strong> {data[ncd].riskNutrients.join(", ")}
// // // // //               </p>
// // // // //               <p>
// // // // //                 <strong>Recommended Foods:</strong> {data[ncd].recommendedFoods.join(", ")}
// // // // //               </p>
// // // // //             </div>
// // // // //           ))}
// // // // //         </div>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default Visualization;
// // // // import React, { useState, useEffect } from "react";
// // // // import styles from "./Visualization.module.css"; // Import the correct CSS module

// // // // const Visualization = ({ selectedFood }) => {
// // // //   const [ncdData, setNCDData] = useState(null);
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [error, setError] = useState(null);

// // // //   useEffect(() => {
// // // //     if (!selectedFood) return;

// // // //     setLoading(true);
// // // //     setError(null);

// // // //     fetch(`/calculate-intake`, {
// // // //       method: "POST",
// // // //       headers: { "Content-Type": "application/json" },
// // // //       body: JSON.stringify({ food: selectedFood, quantity: 100 }), // Assuming 100g for reference
// // // //     })
// // // //       .then((response) => {
// // // //         if (!response.ok) throw new Error("Failed to fetch NCD data");
// // // //         return response.json();
// // // //       })
// // // //       .then((data) => {
// // // //         setNCDData(data);
// // // //         setLoading(false);
// // // //       })
// // // //       .catch((err) => {
// // // //         setError(err.message);
// // // //         setLoading(false);
// // // //       });
// // // //   }, [selectedFood]);

// // // //   return (
// // // //     <div className={styles.container}>
// // // //       <h2 className={styles.heading}>Nutritional Impact of {selectedFood}</h2>

// // // //       {loading ? (
// // // //         <p className={styles.loading}>Loading...</p>
// // // //       ) : error ? (
// // // //         <p className={styles.error}>{error}</p>
// // // //       ) : ncdData && ncdData.associatedNCDs.length > 0 ? (
// // // //         <div className={styles.content}>
// // // //           {ncdData.associatedNCDs.map((ncd, index) => (
// // // //             <div key={index} className={styles.ncdCard}>
// // // //               <h3>{ncd}</h3>
// // // //               <p>
// // // //                 This food contains high levels of {ncdData.exceededNutrients.join(", ")} 
// // // //                 which may increase the risk of {ncd}.
// // // //               </p>
// // // //             </div>
// // // //           ))}
// // // //         </div>
// // // //       ) : (
// // // //         <p>No associated NCDs found for {selectedFood}.</p>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Visualization;
// // // import React, { useEffect, useState } from "react";
// // // import { useLocation } from "react-router-dom";
// // // import styles from "./Visualization.module.css"; // Ensure correct import
// // // import axios from "axios";

// // // const Visualization = () => {
// // //     const location = useLocation();
// // //     const { selectedFood, quantity } = location.state || {};
// // //     const [data, setData] = useState(null);
// // //     const [loading, setLoading] = useState(true);
// // //     const [error, setError] = useState(null);

// // //     useEffect(() => {
// // //         if (!selectedFood || !quantity) {
// // //             setError("Missing food selection or quantity.");
// // //             setLoading(false);
// // //             return;
// // //         }

// // //         axios.post("http://localhost:5000/calculate-intake", { food: selectedFood, quantity })
// // //             .then(response => {
// // //                 console.log("🔍 API Response:", response.data); // Debugging
// // //                 setData(response.data);
// // //                 setLoading(false);
// // //             })
// // //             .catch(error => {
// // //                 console.error("❌ Error fetching intake data:", error);
// // //                 setError("Failed to fetch data. Please try again.");
// // //                 setLoading(false);
// // //             });
// // //     }, [selectedFood, quantity]);

// // //     return (
// // //         <div className={styles.visualizationContainer}>
// // //             <h2 className={styles.heading}>Nutrient Intake Analysis</h2>

// // //             {loading && <p className={styles.loading}>Loading...</p>}
// // //             {error && <p className={styles.error}>{error}</p>}

// // //             {data && !loading && !error && (
// // //                 <div className={styles.results}>
// // //                     <p><strong>Food:</strong> {data.food}</p>
// // //                     <p><strong>Quantity:</strong> {data.quantity}g</p>
                    
// // //                     {/* <p><strong>Exceeded Nutrients:</strong> 
// // //                         {data.exceededNutrients.length > 0 
// // //                             ? data.exceededNutrients.join(", ") 
// // //                             : " No excessive intake detected"}
// // //                     </p>
                    
// // //                     <p><strong>Associated NCDs:</strong> 
// // //                         {data.associatedNCDs.length > 0 
// // //                             ? data.associatedNCDs.join(", ") 
// // //                             : " No disease risks detected"}
// // //                     </p> */}
// // //                     <p>{data.associatedNCDs[0]}</p>
// // //                 </div>
// // //             )}
// // //         </div>
// // //     );
// // // };

// // // export default Visualization;
// // import React, { useEffect, useState } from "react";
// // import { useLocation } from "react-router-dom";
// // import styles from "./Visualization.module.css"; // Ensure correct import
// // import axios from "axios";

// // const Visualization = () => {
// //     const location = useLocation();
// //     const { selectedFood, quantity } = location.state || {};
// //     const [data, setData] = useState(null);
// //     const [loading, setLoading] = useState(true);
// //     const [error, setError] = useState(null);

// //     useEffect(() => {
// //         if (!selectedFood || !quantity) {
// //             setError("Missing food selection or quantity.");
// //             setLoading(false);
// //             return;
// //         }

// //         axios.post("http://localhost:5000/calculate-intake", { food: selectedFood, quantity })
// //             .then(response => {
// //                 console.log("🔍 API Response:", response.data); // Debugging
// //                 setData(response.data);
// //                 setLoading(false);
// //             })
// //             .catch(error => {
// //                 console.error("❌ Error fetching intake data:", error);
// //                 setError("Failed to fetch data. Please try again.");
// //                 setLoading(false);
// //             });
// //     }, [selectedFood, quantity]);

// //     return (
// //         <div className={styles.visualizationContainer}>
// //             <h2 className={styles.heading}>Nutrient Intake Analysis</h2>

// //             {loading && <p className={styles.loading}>Loading...</p>}
// //             {error && <p className={styles.error}>{error}</p>}

// //             {data && !loading && !error && (
// //                 <div className={styles.results}>
// //                     <p><strong>Food:</strong> {data.food}</p>
// //                     <p><strong>Quantity:</strong> {data.quantity}g</p>

// //                     <h3>🚨 Exceeded Nutrients & Associated NCDs:</h3>
// //                     <table className={styles.table}>
// //                         <thead>
// //                             <tr>
// //                                 <th>Exceeded Nutrient</th>
// //                                 <th>Associated NCD</th>
// //                             </tr>
// //                         </thead>
// //                         <tbody>
// //                             {data.exceededNutrients.map((nutrient, index) => {
// //                                 if (index < data.exceededNutrients.length) {
// //                                     return (
// //                                         <tr key={index}>
// //                                             <td>{nutrient}</td>
// //                                             <td>{data.associatedNCDs[index] || "No NCD detected"}</td>
// //                                         </tr>
// //                                     );
// //                                 }
// //                                 return null;
// //                             })}
// //                         </tbody>
// //                     </table>
// //                 </div>
// //             )}
// //         </div>
// //     );
// // };

// // export default Visualization;
// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import styles from "./Visualization.module.css"; // Ensure correct import
// import axios from "axios";

// const Visualization = () => {
//     const location = useLocation();
//     const { selectedFood, quantity } = location.state || {};
//     const [data, setData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         if (!selectedFood || !quantity) {
//             setError("Missing food selection or quantity.");
//             setLoading(false);
//             return;
//         }

//         axios.post("http://localhost:5000/calculate-intake", { food: selectedFood, quantity })
//             .then(response => {
//                 console.log("🔍 API Response:", response.data); // Debugging
//                 setData(response.data);
//                 setLoading(false);
//             })
//             .catch(error => {
//                 console.error("❌ Error fetching intake data:", error);
//                 setError("Failed to fetch data. Please try again.");
//                 setLoading(false);
//             });
//     }, [selectedFood, quantity]);

//     return (
//         <div className={styles.visualizationContainer}>
//             <h2 className={styles.heading}>Nutrient Intake Analysis</h2>

//             {loading && <p className={styles.loading}>Loading...</p>}
//             {error && <p className={styles.error}>{error}</p>}

//             {data && !loading && !error && (
//                 <div className={styles.results}>
//                     <p><strong>Food:</strong> {data.food}</p>
//                     <p><strong>Quantity:</strong> {data.quantity}g</p>

//                     <h3>Exceeded Nutrients & Associated NCDs:</h3>
//                     {data.exceededNutrients.length > 0 ? (
//                         <ul className={styles.nutrientList}>
//                             {data.exceededNutrients.map((nutrient, index) => {
//                                 if (index < data.exceededNutrients.length) {
//                                     return (
//                                         <li key={index} className={styles.nutrientItem}>
//                                             <span className={styles.nutrient}>
//                                                 <strong>{nutrient}</strong>
//                                             </span> 
//                                             -
//                                             <span className={styles.ncd}>
//                                                 <strong> {data.associatedNCDs[index] || "No NCD detected"}</strong>
//                                             </span>
//                                         </li>
//                                     );
//                                 }
//                                 return null;
//                             })}
//                         </ul>
//                     ) : (
//                         <p>No excessive nutrient intake detected.</p>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Visualization;
// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import { Bar } from "react-chartjs-2";
// import "chart.js/auto";
// import styles from "./Visualization.module.css";
// import axios from "axios";

// const Visualization = () => {
//     const location = useLocation();
//     const { selectedFood, quantity } = location.state || {};
//     const [data, setData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         if (!selectedFood || !quantity) {
//             setError("Missing food selection or quantity.");
//             setLoading(false);
//             return;
//         }

//         axios
//             .post("http://localhost:5000/calculate-intake", { food: selectedFood, quantity })
//             .then((response) => {
//                 console.log("🔍 API Response:", response.data);
//                 setData(response.data);
//                 setLoading(false);
//             })
//             .catch((error) => {
//                 console.error("❌ Error fetching intake data:", error);
//                 setError("Failed to fetch data. Please try again.");
//                 setLoading(false);
//             });
//     }, [selectedFood, quantity]);

//     return (
//         <div className={styles.container}>
//             <h2 className={styles.heading}>Nutrient Intake Analysis</h2>

//             {loading && <p className={styles.loading}>Loading...</p>}
//             {error && <p className={styles.error}>{error}</p>}

//             {data && !loading && !error && (
//                 <>
//                     {/* Food & Quantity Details */}
//                     <div className={styles.foodInfo}>
//                         <h3>🍽 Food: <span>{data.food}</span></h3>
//                         <h3>⚖️ Quantity: <span>{data.quantity}g</span></h3>
//                     </div>

//                     {/* Exceeded Nutrients & NCD Risks */}
//                     {data.exceededNutrients.length > 0 ? (
//                         <div className={styles.nutrientsContainer}>
//                             <h3 className={styles.subHeading}>🚨 Exceeded Nutrients & Associated Risks</h3>
//                             {data.exceededNutrients.map((nutrient, index) => (
//                                 <div key={index} className={styles.nutrientCard}>
//                                     <h4>⚠ {nutrient}</h4>
//                                     <p>Intake: <strong>{data.intakeValues[nutrient].toFixed(2)} mg</strong></p>
//                                     <p>Safe Limit: <strong>{data.safeLimits[nutrient].toFixed(2)} mg</strong></p>
//                                     <p className={styles.ncdRisk}>🩺 Risk: {data.associatedNCDs[nutrient]}</p>
//                                 </div>
//                             ))}
//                         </div>
//                     ) : (
//                         <p className={styles.safeMessage}>All nutrient levels are within safe limits!</p>
//                     )}

                    
//                     {data.exceededNutrients.length > 0 && (
//                         <div className={styles.chartContainer}>
//                             <h3 className={styles.subHeading}>📊 Intake vs. Safe Limits</h3>
                            
//                             <Bar
//                                 data={{
//                                     labels: data.exceededNutrients,
//                                     datasets: [
//                                         {
//                                             label: "Your Intake",
//                                             data: data.exceededNutrients.map(nutrient => data.intakeValues[nutrient]),
//                                             backgroundColor: "rgba(255, 99, 132, 0.6)",
//                                         },
//                                         {
//                                             label: "Safe Limit",
//                                             data: data.exceededNutrients.map(nutrient => data.safeLimits[nutrient]),
//                                             backgroundColor: "rgba(54, 162, 235, 0.6)",
//                                         },
//                                     ],
//                                 }}
//                                 options={{
//                                     responsive: false,
//                                     maintainAspectRatio: false,
//                                     scales: {
//                                         y: { beginAtZero: true },
//                                     },
//                                 }}
//                             />
//                         </div>
//                     )}
//                 </>
//             )}
//         </div>
//     );
// };

// export default Visualization;
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import styles from "./Visualization.module.css";
import axios from "axios";

const Visualization = () => {
    const location = useLocation();
    const { items } = location.state || {};
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!items || items.length === 0) {
            setError("No food items provided.");
            setLoading(false);
            return;
        }

        axios
            .post("http://localhost:5000/calculate-intake", { items }) // Modified to send item list
            .then((response) => {
                console.log("🔍 API Response:", response.data);
                setData(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("❌ Error fetching intake data:", error);
                setError("Failed to fetch data. Please try again.");
                setLoading(false);
            });
    }, [items]);

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Nutrient Intake Analysis</h2>

            {loading && <p className={styles.loading}>Loading...</p>}
            {error && <p className={styles.error}>{error}</p>}

            {data && !loading && !error && (
                <>
                    {/* List of Foods & Quantities */}
                    <div className={styles.foodInfo}>
                        <h3>🧾 Foods Consumed:</h3>
                        <ul>
                            {items.map((item, index) => (
                                <li key={index}>🍴 {item.food} - {item.quantity}g</li>
                            ))}
                        </ul>
                    </div>

                    {/* Exceeded Nutrients & NCD Risks */}
                    {data.exceededNutrients.length > 0 ? (
                        <div className={styles.nutrientsContainer}>
                            <h3 className={styles.subHeading}>🚨 Exceeded Nutrients & Associated Risks</h3>
                            {data.exceededNutrients.map((nutrient, index) => (
                                <div key={index} className={styles.nutrientCard}>
                                    <h4>⚠ {nutrient}</h4>
                                    <p>Intake: <strong>{data.intakeValues[nutrient].toFixed(2)} mg</strong></p>
                                    <p>Toxicity Limit: <strong>{data.safeLimits[nutrient].toFixed(2)} mg</strong></p>
                                    <p className={styles.ncdRisk}>🩺 Risk: {data.associatedNCDs[nutrient]}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className={styles.safeMessage}>✅ All nutrient levels are within safe limits!</p>
                    )}

                    
                    {data.exceededNutrients.length > 0 && (
                        <div className={styles.chartContainer}>
                            <h3 className={styles.subHeading}>📊 Intake vs. Toxicity Limits</h3>

                            <Bar
                                data={{
                                    labels: data.exceededNutrients,
                                    datasets: [
                                        {
                                            label: "Your Intake",
                                            data: data.exceededNutrients.map(n => data.intakeValues[n]),
                                            backgroundColor: "rgba(255, 99, 132, 0.6)",
                                        },
                                        {
                                            label: "Toxicity Limit",
                                            data: data.exceededNutrients.map(n => data.safeLimits[n]),
                                            backgroundColor: "rgba(54, 162, 235, 0.6)",
                                        },
                                    ],
                                }}
                                options={{
                                    responsive: false,
                                    maintainAspectRatio: false,
                                    scales: {
                                        y: { beginAtZero: true },
                                    },
                                }}
                            />
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Visualization;


// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import { Bar } from "react-chartjs-2";
// import "chart.js/auto";
// import styles from "./Visualization.module.css";
// import axios from "axios";

// const Visualization = () => {
//     const location = useLocation();
//     const { items } = location.state || {};
//     const [data, setData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         if (!items || items.length === 0) {
//             setError("No food items provided.");
//             setLoading(false);
//             return;
//         }

//         axios
//             .post("http://localhost:5000/calculate-intake", { items }) // Modified to send item list
//             .then((response) => {
//                 console.log("🔍 API Response:", response.data);
//                 setData(response.data);
//                 setLoading(false);
//             })
//             .catch((error) => {
//                 console.error("❌ Error fetching intake data:", error);
//                 setError("Failed to fetch data. Please try again.");
//                 setLoading(false);
//             });
//     }, [items]);

//     return (
//         <div className={styles.container}>
//             <h2 className={styles.heading}>Nutrient Intake Analysis</h2>

//             {loading && <p className={styles.loading}>Loading...</p>}
//             {error && <p className={styles.error}>{error}</p>}

//             {data && !loading && !error && (
//                 <>
//                     {/* List of Foods & Quantities */}
//                     <div className={styles.foodInfo}>
//                         <h3>🧾 Foods Consumed:</h3>
//                         <ul>
//                             {items.map((item, index) => (
//                                 <li key={index}>🍴 {item.food} - {item.quantity}g</li>
//                             ))}
//                         </ul>
//                     </div>

//                     {/* Exceeded Nutrients & NCD Risks */}
//                     {data.exceededNutrients.length > 0 ? (
//                         <div className={styles.nutrientsContainer}>
//                             <h3 className={styles.subHeading}>🚨 Exceeded Nutrients & Associated Risks</h3>
//                             {data.exceededNutrients.map((nutrient, index) => (
//                                 <div key={index} className={styles.nutrientCard}>
//                                     <h4>⚠ {nutrient}</h4>
//                                     <p>Intake: <strong>{data.intakeValues[nutrient].toFixed(2)} mg</strong></p>
//                                     <p>Safe Limit: <strong>{data.safeLimits[nutrient].toFixed(2)} mg</strong></p>
//                                     <p>Toxicity Limit: <strong>{data.toxicityLimits[nutrient].toFixed(2)} mg</strong></p>
//                                     <p className={styles.ncdRisk}>🩺 Risk: {data.associatedNCDs[nutrient]}</p>
//                                 </div>
//                             ))}
//                         </div>
//                     ) : (
//                         <p className={styles.safeMessage}>✅ All nutrient levels are within safe limits!</p>
//                     )}

//                     {/* Bar Chart for Intake vs Safe and Toxicity Limits */}
//                     {data.exceededNutrients.length > 0 && (
//                         <div className={styles.chartContainer}>
//                             <h3 className={styles.subHeading}>📊 Intake vs. Safe and Toxicity Limits</h3>

//                             <Bar
//                                 data={{
//                                     labels: data.exceededNutrients,
//                                     datasets: [
//                                         {
//                                             label: "Your Intake",
//                                             data: data.exceededNutrients.map(n => data.intakeValues[n]),
//                                             backgroundColor: "rgba(255, 99, 132, 0.6)",
//                                         },
//                                         {
//                                             label: "Safe Limit",
//                                             data: data.exceededNutrients.map(n => data.safeLimits[n]),
//                                             backgroundColor: "rgba(54, 162, 235, 0.6)",
//                                         },
//                                         {
//                                             label: "Toxicity Limit",
//                                             data: data.exceededNutrients.map(n => data.toxicityLimits[n]),
//                                             backgroundColor: "rgba(255, 159, 64, 0.6)",
//                                         },
//                                     ],
//                                 }}
//                                 options={{
//                                     responsive: true,
//                                     maintainAspectRatio: false,
//                                     scales: {
//                                         y: { beginAtZero: true },
//                                     },
//                                 }}
//                             />
//                         </div>
//                     )}
//                 </>
//             )}
//         </div>
//     );
// };

// export default Visualization;
