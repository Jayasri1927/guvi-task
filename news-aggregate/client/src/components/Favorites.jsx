import React from "react";
import { useFavorites } from "../context/FavoritesContext";
import EverythingCard from "./EverythingCard";

function Favorites() {
  const { favorites } = useFavorites();

  return (
    <div className="my-10 p-5">
      <h2 className="text-2xl font-bold">Favorite News</h2>
      {favorites.length === 0 ? (
        <p>No favorite articles yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((article, index) => (
            <EverythingCard key={index} {...article} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
