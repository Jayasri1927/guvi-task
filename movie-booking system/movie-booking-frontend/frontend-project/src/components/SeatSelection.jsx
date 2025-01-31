import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const SeatSelection = () => {
  const { movieId } = useParams();
  const [seats, setSeats] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  const handleSeatSelect = (seat) => {
    setSeats((prevSeats) => [...prevSeats, seat]);
    setTotalAmount((prevAmount) => prevAmount + 10);  // Assuming each seat costs $10
  };

  const handleBooking = () => {
    // Proceed to booking (send to backend)
    navigate('/booking-confirmation');
  };

  return (
    <div>
      <h2>Select Seats</h2>
      <div>
        {/* Simple seat selection UI */}
        <button onClick={() => handleSeatSelect('A1')}>A1</button>
        <button onClick={() => handleSeatSelect('A2')}>A2</button>
        <button onClick={() => handleSeatSelect('A2')}>A3</button>
        <button onClick={() => handleSeatSelect('A2')}>A4</button>
        <button onClick={() => handleSeatSelect('A2')}>A5</button>
        <button onClick={() => handleSeatSelect('A2')}>A6</button>
        <button onClick={() => handleSeatSelect('A2')}>A7</button>
        <button onClick={() => handleSeatSelect('A2')}>A8</button>
        <button onClick={() => handleSeatSelect('A2')}>A9</button>
        <button onClick={() => handleSeatSelect('A2')}>A10</button>
        <button onClick={() => handleSeatSelect('A2')}>A11</button>
        <button onClick={() => handleSeatSelect('A2')}>A12</button>
        <button onClick={() => handleSeatSelect('A2')}>A13</button>
        <button onClick={() => handleSeatSelect('A2')}>A14</button>
        <button onClick={() => handleSeatSelect('A2')}>A15</button>
        {/* Add more buttons for other seats */}
      </div>
      <div>
        <p>Total: ${totalAmount}</p>
        <button onClick={handleBooking}>Book Tickets</button>
      </div>
    </div>
  );
};

export default SeatSelection;
