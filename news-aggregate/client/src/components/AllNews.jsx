import React, { useState, useEffect } from "react";
import EverythingCard from "./EverythingCard";
import Loader from "./Loader";

function AllNews() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const apiUrl = `http://localhost:5000/all-news?language=en`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((json) => {
        if (json.success && json.data && json.data.articles) {
          setData(json.data.articles || []);
        } else {
          setError(json.message || "An error occurred while fetching news.");
          setData([]);
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setError("Failed to fetch news. Please try again later.");
        setData([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 p-5">
        {!isLoading ? (
          data.length > 0 ? (
            data.map((article, index) => (
              <EverythingCard
                key={index}
                title={article.title}
                description={article.description}
                imgUrl={article.image}
                publishedAt={article.published_at}
                url={article.url}
                author={article.author || "Unknown"}
                source={article.source || "Unknown"}
              />
            ))
          ) : (
            <p>No articles found.</p>
          )
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
}

export default AllNews;
