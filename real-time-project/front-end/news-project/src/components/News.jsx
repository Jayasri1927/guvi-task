// src/News.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:5000/news')
      .then((response) => {
        setNews(response.data);
        setLoading(false); // Data has been fetched, stop loading
      })
      .catch((error) => {
        console.error('Error fetching news:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <h1>Apple News (January 26, 2025)</h1>

      {loading ? (
        <p className="loading">Loading...</p> // Show loading text while fetching
      ) : (
        <div>
          {news.length === 0 ? (
            <p>No news available at the moment.</p>
          ) : (
            news.map((article, index) => (
              <div key={index} className="news-item">
                <h2>{article.title}</h2>
                <p>{article.description}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  Read more
                </a>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default News;
