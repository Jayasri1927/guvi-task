import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext"; // ✅ Import AuthContext

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [selectedShowtimes, setSelectedShowtimes] = useState({});
  const { user } = useContext(AuthContext); // ✅ Get user from context
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/movie");
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, []);

  const handleShowtimeChange = (movieId, value) => {
    setSelectedShowtimes((prev) => ({
      ...prev,
      [movieId]: value,
    }));
  };

  const handleBooking = (movieId) => {
    if (!user) {
      navigate("/login"); // ✅ Redirect to login if not authenticated
    } else if (selectedShowtimes[movieId]) {
      navigate(`/movie/${movieId}/seats?showtime=${encodeURIComponent(selectedShowtimes[movieId])}`);
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2 style={{ color: "#f8f8f8", marginBottom: "20px" }}>Available Movies</h2>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px" }}>
        {movies.map((movie) => (
          <div key={movie._id} style={{
            backgroundColor: "#333",
            padding: "15px",
            borderRadius: "10px",
            width: "250px",
            textAlign: "center",
            boxShadow: "0px 2px 5px rgba(255, 255, 255, 0.2)"
          }}>
            <img src={movie.poster} alt={movie.title} style={{ width: "100%", height: "300px", borderRadius: "10px" }} />
            <h3 style={{ color: "white", marginTop: "10px" }}>{movie.title}</h3>
            <p style={{ color: "#ddd", fontSize: "14px", marginBottom: "8px" }}>
              {movie.description.length > 50 ? movie.description.slice(0, 50) + "..." : movie.description}
            </p>

            {/* Showtime Dropdown */}
            <div style={{ marginTop: "10px" }}>
              <label htmlFor={`showtime-${movie._id}`} style={{ color: "white", fontSize: "14px", fontWeight: "bold" }}>Select Showtime:</label>
              <select
                id={`showtime-${movie._id}`}
                value={selectedShowtimes[movie._id] || ""}
                onChange={(e) => handleShowtimeChange(movie._id, e.target.value)}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "8px",
                  fontSize: "14px",
                  marginTop: "5px",
                  borderRadius: "5px",
                  backgroundColor: "#222",
                  color: "white",
                  border: "1px solid #ddd"
                }}
              >
                <option value="">Choose a Showtime</option>
                {movie.showtimes && movie.showtimes.length > 0 ? (
                  movie.showtimes.map((show, index) => (
                    <option key={index} value={`${show.date} ${show.time}`}>
                      {show.date} - {show.time}
                    </option>
                  ))
                ) : (
                  <option disabled>No Showtimes Available</option>
                )}
              </select>
            </div>

            {/* Book Now Button */}
            <button
              onClick={() => handleBooking(movie._id)}
              style={{
                display: "inline-block",
                padding: "10px",
                backgroundColor: selectedShowtimes[movie._id] ? "#ff4500" : "#555",
                color: "white",
                textDecoration: "none",
                borderRadius: "5px",
                marginTop: "10px",
                fontWeight: "bold",
                cursor: selectedShowtimes[movie._id] ? "pointer" : "not-allowed",
                opacity: selectedShowtimes[movie._id] ? 1 : 0.5,
              }}
              disabled={!selectedShowtimes[movie._id]}
            >
              <Link
  to={selectedShowtimes[movie._id] ? 
    `/movie/${movie._id}/seats?showtime=${encodeURIComponent(selectedShowtimes[movie._id])}` : "#"}
>
  Book Now
</Link>

             
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
