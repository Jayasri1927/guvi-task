import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/movies");
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
    <h2 style={{ color: "#f8f8f8", marginBottom: "20px" }}>Available Movies</h2>
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px" }}>
      {movies.map((movie) => (
        <div key={movie._id} style={{
          backgroundColor: "#333",
          padding: "15px",
          borderRadius: "10px",
          width: "200px",
          textAlign: "center",
          boxShadow: "0px 2px 5px rgba(255, 255, 255, 0.2)"
        }}>
          <img src={movie.poster} alt={movie.title} style={{ width: "100%", height: "250px", borderRadius: "10px" }} />
          <h3 style={{ color: "white", marginTop: "10px" }}>{movie.title}</h3>
          <Link to={`/movies/${movie._id}/seats`} style={{
            display: "inline-block",
            padding: "10px",
            backgroundColor: "#ff4500",
            color: "white",
            textDecoration: "none",
            borderRadius: "5px",
            marginTop: "10px"
          }}>
            Book Now
          </Link>
        </div>
      ))}
    </div>
  </div>
);
};

export default MovieList;
