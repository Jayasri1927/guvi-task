import React, { useState, useEffect } from "react";
import EverythingCard from "./EverythingCard";
import Loader from "./Loader";

function TopHeadlines() {
  const [data, setData] = useState([]); // Default empty array
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const pageSize = 12;

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetch(`http://localhost:5000/all-news?page=${page}&pageSize=${pageSize}`)
      .then((response) => response.json())
      .then((json) => {
       

        if (json.success && Array.isArray(json.articles)) {
          setData(json.articles); // ✅ Corrected: `json.articles` instead of `json.data.articles`
        } else {
          setError(json.message || "Failed to fetch news.");
          setData([]);
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setError("Failed to fetch news.");
        setData([]);
      })
      .finally(() => setIsLoading(false));
  }, [page]);

  // ✅ Debugging: Check if `data` updates correctly
  // useEffect(() => {
  //   console.log("📌 Updated data:", data);
  // }, [data]);

  return (
    <>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {isLoading && <Loader />}

      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 p-5">
        {data.length > 0 ? (
          data.map((article, index) => {
            console.log("📰 Rendering Article:", article); // ✅ Ensure articles are being rendered

            return (
              <EverythingCard
                key={index}
                title={article.title || "No Title Available"}
                description={article.description || "No Description Available"}
                imgUrl={article.urlToImage || "/default-news.jpg"} // Fallback image
                publishedAt={
                  article.publishedAt
                    ? new Date(article.publishedAt).toLocaleDateString()
                    : "Unknown Date"
                }
                url={article.url}
                author={article.author || "Unknown"}
                source={article.source?.name || "Unknown Source"}
              />
            );
          })
        ) : (
          !isLoading && <p>No articles found.</p>
        )}
      </div>

      {/* ✅ Pagination Buttons */}
      <div className="flex justify-center mt-4 mb-20">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className={`px-4 py-2 mx-2 bg-blue-500 text-white rounded ${
            page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          }`}
        >
          Previous
        </button>
        <button
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 mx-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Next
        </button>
      </div>
    </>
  );
}

export default TopHeadlines;
