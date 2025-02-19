// server.js
const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const News = require('./models/News');
const connectDB = require('./config/dbConfig');
const app = express();

const cors = require('cors');
app.use(cors());  // Enable CORS


connectDB(); // Connect to MongoDB

const PORT = process.env.PORT || 3000;

// Fetch news from NewsAPI
const fetchNews = async () => {
  const url = 'https://newsapi.org/v2/everything';
  const params = {
    q: 'apple',  // Search term (for "apple" news)
    from: '2025-01-26',  // Start date
    to: '2025-01-26',  // End date
    sortBy: 'popularity',
    apiKey: '0aff392eeb2c499fb9bcdbde633c521b',  // API Key
  };

  try {
    const response = await axios.get(url, { params });
    const articles = response.data.articles.map((article) => ({
      title: article.title,
      description: article.description,
      url: article.url,
      source: article.source.name,
      publishedAt: new Date(article.publishedAt),
    }));

    // Save articles to MongoDB
    await News.insertMany(articles);
    console.log('News saved to database!');
  } catch (error) {
    console.error('Error fetching news:', error);
  }
};

// Call fetchNews function once at server start
fetchNews();

// Route to get news
app.get('/news', async (req, res) => {
  try {
    const news = await News.find().sort({ publishedAt: -1 });
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news from database' });
  }
});

// Set up the server to listen on port 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
