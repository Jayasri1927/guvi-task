import React from 'react';
import { useLocation } from 'react-router-dom';

const BookingConfirmation = () => {
  const location = useLocation();
  const { selectedSeats, totalAmount } = location.state || { selectedSeats: [], totalAmount: 0 };

  return (
    <div>
      <h2>Booking Successful!</h2>
      <p>Your booking is confirmed.</p>
      <p><strong>Seats:</strong> {selectedSeats.join(', ')}</p>
      <p><strong>Total Amount:</strong> ${totalAmount}</p>
      <p>Enjoy the movie!</p>
    </div>
  );
};

export default BookingConfirmation;
