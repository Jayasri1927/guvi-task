import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const SeatSelection = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the selected date from MovieList (if available)
  const initialDate = location.state?.date || "";

  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [date, setDate] = useState(initialDate);

  // Function to fetch seats when the date changes
  useEffect(() => {
    const fetchSeats = async () => {
      if (!date) return; // Wait until the user selects a date
      setLoading(true);
      setError("");

      try {
        const response = await axios.get(`http://localhost:5000/api/seats/${movieId}/seats?date=${date}`);
        if (Array.isArray(response.data)) {
          setSeats(response.data);
        } else {
          setSeats([]); // No seats found, set an empty array
        }
      } catch (error) {
        console.error("Error fetching seats", error);
        setError("Error fetching seats. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchSeats();
  }, [movieId, date]); // Runs when movieId or date changes

  // Function to select/deselect a seat
  const handleSelectSeat = (seat) => {
    if (seat.status === "booked") return;
    setSelectedSeats((prev) =>
      prev.includes(seat.seatNumber)
        ? prev.filter((s) => s !== seat.seatNumber)
        : [...prev, seat.seatNumber]
    );
  };

  // Function to book selected seats
  const handleBooking = async () => {
    if (!date) {
      alert("Please select a date.");
      return;
    }
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/seats/book", {
        movieId,
        selectedSeats,
        date
      });

      alert("Seats booked successfully!");
      navigate("/booking-confirmation", { state: { selectedSeats, date } });
    } catch (error) {
      alert(error.response?.data?.message || "Booking failed! Please try again.");
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center", color: "#fff", backgroundColor: "#222", minHeight: "100vh" }}>
      <h2 style={{ marginBottom: "20px" }}>Select Your Seats</h2>

      {/* Date Selection */}
      <label style={{ color: "white", marginRight: "10px" }}>Select Date:</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={{ padding: "5px", marginBottom: "20px" }}
      />

      {/* Show Loading/Error Messages */}
      {loading ? (
        <p>Loading seats...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : seats.length === 0 ? (
        <p>No seats available for the selected date.</p>
      ) : (
        <>
          {/* Seat Grid */}
          {Array.isArray(seats) && seats.length > 0 ? (
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
          ) : (
            <p>No seats available for the selected date.</p>
          )}

          {/* Confirm Booking Button */}
          <button
            onClick={handleBooking}
            disabled={selectedSeats.length === 0 || !date}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: selectedSeats.length > 0 && date ? "#ff4500" : "#555",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: selectedSeats.length > 0 && date ? "pointer" : "not-allowed",
              opacity: selectedSeats.length > 0 && date ? 1 : 0.5,
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
