import React from "react";
import { useFavorites } from "../context/FavoritesContext";
import { useReadLater } from "../context/ReadLaterContext";

function EverythingCard(props) {
  const { favorites, toggleFavorite } = useFavorites();
  const { readLater, addToReadLater, removeFromReadLater } = useReadLater();

  const isFavorite = favorites.some((article) => article.url === props.url);
  const isReadLater = readLater.some((article) => article.url === props.url);

  return (
    <div className="everything-card mt-5 p-5 border rounded-lg shadow-md bg-white dark:bg-gray-900">
      <h2 className="text-lg md:text-xl font-semibold text-gray-700 dark:text-white leading-tight">
        {props.title}
      </h2>

      <div className="everything-card-img my-3">
        {props.imgUrl && (
          <img className="rounded-lg w-full h-40 object-cover" src={props.imgUrl} alt="News" />
        )}
      </div>

      <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
        {props.description?.substring(0, 150)}...
      </p>

      <div className="info mt-2 text-xs md:text-sm text-gray-600 dark:text-gray-400">
        <p>
          <strong>Source:</strong>{" "}
          <a href={props.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            {props.source}
          </a>
        </p>
        <p><strong>Author:</strong> {props.author || "Unknown"}</p>
        <p><strong>Published At:</strong> {props.publishedAt}</p>
      </div>

      {/* Buttons for Favorites and Read Later */}
      <div className="mt-3 flex flex-wrap justify-between gap-2">
        {/* Favorites Button */}
        <button
          className={`px-4 py-2 text-sm font-medium border rounded-md flex-1 ${
            isFavorite ? "bg-red-500 text-white hover:bg-red-600" : "bg-gray-200 text-black hover:bg-gray-300"
          }`}
          onClick={() => toggleFavorite({
            title: props.title,
            description: props.description,
            imgUrl: props.imgUrl,
            url: props.url,
            source: props.source,
            author: props.author,
            publishedAt: props.publishedAt,
          })}
        >
          {isFavorite ? "Remove from Favorites" : "❤️ Add to Favorites"}
        </button>

        {/* Read Later Button */}
        <button
          className={`px-4 py-2 text-sm font-medium border rounded-md flex-1 ${
            isReadLater ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-gray-200 text-black hover:bg-gray-300"
          }`}
          onClick={() => {
            if (isReadLater) {
              removeFromReadLater(props.url);
            } else {
              addToReadLater({
                title: props.title,
                description: props.description,
                imgUrl: props.imgUrl,
                url: props.url,
                source: props.source,
                author: props.author,
                publishedAt: props.publishedAt,
              });
            }
          }}
        >
          {isReadLater ? "❌ Remove from Read Later" : "📌 Save to Read Later"}
        </button>
      </div>
    </div>
  );
}

export default EverythingCard;
