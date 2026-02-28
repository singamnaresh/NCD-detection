import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./Chatbot.css";
import ReactMarkdown from "react-markdown";


const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  // Ref to control typing animation interval
  const typingIntervalRef = useRef(null);

  // Typing animation (ChatGPT-like, fixed)
  const typeEffect = (text) => {
    // Clear any previous typing animation
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
    }

    let index = 0;
    setResponse("");

    typingIntervalRef.current = setInterval(() => {
      setResponse((prev) => prev + text.charAt(index));
      index++;

      if (index >= text.length) {
        clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;
      }
    }, 18); // typing speed (smaller = faster)
  };

  // Cleanup interval when component unmounts
  useEffect(() => {
    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }
    };
  }, []);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    setLoading(true);
    setResponse("");

    try {
      const res = await axios.post("http://localhost:5000/chatbot", {
        message,
      });

      typeEffect(res.data.response || "No response generated.");
    } catch (error) {
      console.error("Error fetching response:", error.message);
      setResponse("❌ Failed to fetch response. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      <h2>🍎 Nutrition Chatbot</h2>

      <textarea
        className="chatbot-input"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask about food nutrition..."
      />

      <button
        className={`chatbot-button ${loading ? "disabled" : ""}`}
        onClick={handleSendMessage}
        disabled={loading}
      >
        {loading ? "Loading..." : "Ask"}
      </button>

      {response && (
  <div className="chatbot-response markdown">
    <ReactMarkdown>{response}</ReactMarkdown>
  </div>
)}

    </div>
  );
};

export default Chatbot;
