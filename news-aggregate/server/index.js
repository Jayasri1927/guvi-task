require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("🚀 MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

const app = express();
const PORT = process.env.PORT || 5000;
const API_KEY = process.env.API_KEY || "1980439810fa423cb960f4cefffcb0f3"; // Use valid key

console.log("🛠️ API Key in use:", API_KEY);

// Middleware
app.use(cors());
app.use(express.json());

// 🔍 Helper Function to Fetch News
async function fetchNews(url) {
    try {
        const response = await axios.get(url);
        console.log("📰 API Response:", response.data); // Debugging
        return { success: true, articles: response.data.articles || [] }; // Fix articles
    } catch (error) {
        console.error("⚠️ API Request Error:", error.message);
        return { success: false, message: "Error fetching news." };
    }
}

// ✅ Fetch Top Headlines (Fixed)
app.get("/top-headlines", async (req, res) => {
    try {
        console.log("🔍 Fetching news from NewsAPI...");

        const response = await axios.get(
            `https://newsapi.org/v2/top-headlines?country=us&pageSize=6&apiKey=${API_KEY}`
        );

        console.log("📰 NewsAPI Response:", response.data); // Debugging

        if (!response.data.articles || response.data.articles.length === 0) {
            return res.status(404).json({ success: false, message: "No articles found." });
        }

        res.json({ success: true, data: { articles: response.data.articles } });

    } catch (error) {
        console.error("❌ Error fetching news:", error.response ? error.response.data : error.message);
        res.status(500).json({ success: false, message: "Failed to fetch news." });
    }
});


// ✅ Fetch All News (Everything)
app.get("/all-news", async (req, res) => {
    const { page = 1, pageSize = 20, q = "technology" } = req.query;
    const url = `https://newsapi.org/v2/everything?q=${q}&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;

    const result = await fetchNews(url);
    res.status(result.success ? 200 : 500).json(result);
});

// ✅ Fetch Country-Specific News
app.get("/country/:iso", async (req, res) => {
    const { page = 1, pageSize = 10 } = req.query;
    const { iso } = req.params;
    const url = `https://newsapi.org/v2/top-headlines?country=${iso}&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;

    const result = await fetchNews(url);
    res.status(result.success ? 200 : 500).json(result);
});

// ✅ Start Server
app.listen(PORT, () => {
    console.log(`✨ Server is running at http://localhost:${PORT}`);
});
