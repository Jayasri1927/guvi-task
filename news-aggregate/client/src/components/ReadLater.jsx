import React from "react";
import { useReadLater } from "../context/ReadLaterContext";

function ReadLaterPage() {
  const { readLater, removeFromReadLater } = useReadLater();

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Read Later Articles</h2>

      {readLater.length === 0 ? (
        <p className="text-gray-600">No articles saved for later.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {readLater.map((article, index) => (
            <div key={index} className="border p-4 rounded-lg shadow-md bg-white">
              <h3 className="text-lg font-semibold">{article.title}</h3>
              {article.imgUrl && (
                <img className="rounded-lg w-full h-40 object-cover my-2" src={article.imgUrl} alt="News" />
              )}
              <p className="text-sm text-gray-700">{article.description?.substring(0, 100) || "No description available."}...</p>
              <p className="text-xs text-gray-600 mt-2">
                <strong>Source:</strong>{" "}
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  {article.source || "Unknown"}
                </a>
              </p>
              <button
                className="mt-3 px-4 py-2 text-sm font-medium bg-red-500 text-white hover:bg-red-600 rounded-md"
                onClick={() => removeFromReadLater(article.url)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ReadLaterPage;
