import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SeatSelection = () => {
  const { movieId } = useParams();
  const [seats, setSeats] = useState([]); // State to store seat data
  const [selectedSeats, setSelectedSeats] = useState([]); // State to store selected seats
  const [totalAmount, setTotalAmount] = useState(0); // State to track the total amount
  const [error, setError] = useState(null); // State to handle errors
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch seats for the movie
    const fetchSeats = async () => {
      try {
        const response = await axios.get(`https://guvi-task-40.onrender.com/api/movies/${movieId}/seats`);
        setSeats(response.data); // Store fetched seats in state
      } catch (error) {
        setError('Failed to load seat data. Please try again later.');
        console.error('Error fetching seats:', error);
      }
    };

    fetchSeats(); // Fetch seats when the component mounts
  }, [movieId]);

  // Handle seat selection
  const handleSeatSelect = (seat) => {
    if (seat.status === 'available') {
      setSelectedSeats((prevSeats) => [...prevSeats, seat]);
      setTotalAmount((prevAmount) => prevAmount + 10); // Assuming each seat costs $10
    }
  };

  // Handle seat deselection
  const handleSeatDeselect = (seat) => {
    setSelectedSeats((prevSeats) => prevSeats.filter((s) => s.seatNumber !== seat.seatNumber));
    setTotalAmount((prevAmount) => prevAmount - 10); // Remove $10 from total
  };

  // Handle booking confirmation
  const handleBooking = () => {
    // Send booking details to the backend or proceed to booking confirmation
    navigate('/booking-confirmation');
  };

  return (
    <div>
      <h2>Select Seats</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
      <div>
        {seats.length > 0 ? (
          seats.map((seat) => (
            <button
              key={seat.seatNumber}
              disabled={seat.status === 'booked'} // Disable booked seats
              onClick={() => {
                if (selectedSeats.find((s) => s.seatNumber === seat.seatNumber)) {
                  handleSeatDeselect(seat); // Deselect the seat if already selected
                } else {
                  handleSeatSelect(seat); // Select the seat if not already selected
                }
              }}
              style={{
                backgroundColor:
                  seat.status === 'booked' ? 'gray' : // Booked seats are gray
                  selectedSeats.find((s) => s.seatNumber === seat.seatNumber) ? 'green' : 'lightblue', // Selected seats are green
                margin: '5px',
                padding: '10px',
              }}
            >
              {seat.seatNumber}
            </button>
          ))
        ) : (
          <p>Loading seats...</p>
        )}
      </div>
      <div>
        <p>Total: ${totalAmount}</p>
        <button onClick={handleBooking} disabled={selectedSeats.length === 0}>Book Tickets</button>
      </div>
    </div>
  );
};

export default SeatSelection;
