import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [selectedShowtime, setSelectedShowtime] = useState("");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`https://guvi-task-44.onrender.com/api/movie/${movieId}`);
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };
    fetchMovie();
  }, [movieId]);

  if (!movie) return <p style={{ color: "white", textAlign: "center", marginTop: "20px" }}>Loading movie details...</p>;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px", color: "white" }}>
      <img src={movie.poster} alt={movie.title} style={{ width: "300px", height: "400px", borderRadius: "10px", boxShadow: "0px 2px 5px rgba(255, 255, 255, 0.2)" }} />
      <h2 style={{ fontSize: "24px", marginTop: "10px" }}>{movie.title}</h2>
      <p style={{ fontSize: "16px", color: "#ddd", textAlign: "center", maxWidth: "600px" }}>{movie.description}</p>

      {/* Showtimes Dropdown */}
      <div style={{ marginTop: "15px", textAlign: "center" }}>
        <label htmlFor="showtime-select" style={{ fontSize: "18px", fontWeight: "bold", display: "block", marginBottom: "5px" }}>
          Select Showtime:
        </label>
        <select
          id="showtime-select"
          value={selectedShowtime}
          onChange={(e) => setSelectedShowtime(e.target.value)}
          style={{ padding: "8px", fontSize: "16px", borderRadius: "5px", border: "1px solid #ddd", backgroundColor: "#333", color: "white" }}
        >
          <option value="">Choose a Showtime</option>
          {movie.showtimes.map((show, index) => (
            <option key={index} value={`${show.date} ${show.time}`}>
              {show.date} - {show.time}
            </option>
          ))}
        </select>
      </div>

      {/* Proceed to Seat Selection */}
      <Link
        to={selectedShowtime ? `/movie/${movieId}/seats?showtime=${encodeURIComponent(selectedShowtime)}` : "#"}
        style={{
          display: "inline-block",
          padding: "10px 20px",
          backgroundColor: selectedShowtime ? "#ff4500" : "#555",
          color: "white",
          textDecoration: "none",
          borderRadius: "5px",
          marginTop: "15px",
          pointerEvents: selectedShowtime ? "auto" : "none", // Disable button if no showtime selected
          opacity: selectedShowtime ? 1 : 0.5,
        }}
      >
        Select Seats
      </Link>
    </div>
  );
};

export default MovieDetails;
