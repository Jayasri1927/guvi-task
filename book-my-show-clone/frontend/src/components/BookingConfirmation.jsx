import React from "react";
import { useNavigate } from "react-router-dom";

const BookingConfirmation = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/"); // Navigates to the home page
  };

  return (
    <div style={{
      textAlign: "center",
      padding: "50px",
      color: "white",
      backgroundColor: "#121212",
      minHeight: "100vh"
    }}>
      <h2 style={{ marginBottom: "20px", color: "#ff4500" }}>Booking Confirmed!</h2>
      <p>Your seats have been successfully booked. Enjoy your movie!</p>
      <button 
        onClick={handleBackToHome}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#ff4500",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Back to Home
      </button>
    </div>
  );
};

export default BookingConfirmation;
