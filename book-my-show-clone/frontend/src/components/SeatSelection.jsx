import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const SeatSelection = () => {
  const { movieId } = useParams();
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await axios.get(`https://guvi-task-43.onrender.com/api/seats/${movieId}/seats`);
        setSeats(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching seats:", error);
        setError("Failed to load seats. Please try again.");
        setLoading(false);
      }
    };
    fetchSeats();
  }, [movieId]);

  const handleSelectSeat = (seat) => {
    if (seat.status === "booked") return;
    setSelectedSeats((prev) =>
      prev.includes(seat.seatNumber)
        ? prev.filter((s) => s !== seat.seatNumber)
        : [...prev, seat.seatNumber]
    );
  };

  const handleBooking = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }
    navigate("/booking-confirmation", { state: { selectedSeats } });
  };

  return (
    <div style={{ padding: "20px", textAlign: "center", color: "#fff", backgroundColor: "#222", minHeight: "100vh" }}>
      <h2 style={{ marginBottom: "20px" }}>Select Your Seats</h2>

      {loading ? (
        <p>Loading seats...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : seats.length === 0 ? (
        <p>No seats available.</p>
      ) : (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "10px", justifyContent: "center" }}>
            {seats.map((seat) => (
              <button
                key={seat.seatNumber}
                onClick={() => handleSelectSeat(seat)}
                style={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: seat.status === "booked" ? "#444" : selectedSeats.includes(seat.seatNumber) ? "#ff4500" : "#666",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: seat.status === "booked" ? "not-allowed" : "pointer",
                }}
              >
                {seat.seatNumber}
              </button>
            ))}
          </div>

          <button
            onClick={handleBooking}
            disabled={selectedSeats.length === 0}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: selectedSeats.length > 0 ? "#ff4500" : "#555",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: selectedSeats.length > 0 ? "pointer" : "not-allowed",
              opacity: selectedSeats.length > 0 ? 1 : 0.5,
            }}
          >
            Confirm Booking
          </button>
        </>
      )}
    </div>
  );
};

export default SeatSelection;
