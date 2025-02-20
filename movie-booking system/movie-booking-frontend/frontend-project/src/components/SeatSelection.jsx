import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const SeatSelection = () => {
  const { movieId } = useParams();
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await axios.get(
          `https://guvi-task-41.onrender.com/api/movies/${movieId}/seats`
        );
        setSeats(response.data);
      } catch (error) {
        setError("Failed to load seats. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchSeats();
  }, [movieId]);

  const handleSeatClick = (seat) => {
    if (seat.status === "booked") return;
    setSelectedSeats((prev) =>
      prev.some((s) => s.seatNumber === seat.seatNumber)
        ? prev.filter((s) => s.seatNumber !== seat.seatNumber)
        : [...prev, seat]
    );
  };

  if (loading) return <p>Loading seats...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="seat-container">
      <h2>Select Seats</h2>
      <div className="seat-grid">
        {seats.map((seat) => (
          <button
            key={seat.seatNumber}
            className={`seat-button ${seat.status} ${
              selectedSeats.find((s) => s.seatNumber === seat.seatNumber)
                ? "selected"
                : ""
            }`}
            onClick={() => handleSeatClick(seat)}
            disabled={seat.status === "booked"}
          >
            {seat.seatNumber}
          </button>
        ))}
      </div>
      <button className="confirm-btn" onClick={() => navigate("/confirm")}>
        Book Tickets
      </button>
    </div>
  );
};

export default SeatSelection;
