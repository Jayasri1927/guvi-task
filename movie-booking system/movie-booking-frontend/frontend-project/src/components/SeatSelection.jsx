import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SeatSelection = () => {
  const { movieId } = useParams();
  const [seats, setSeats] = useState([]); // State to store seat data
  const [selectedSeats, setSelectedSeats] = useState([]); // State to store selected seats
  const [totalAmount, setTotalAmount] = useState(0); // State to track the total amount
  const navigate = useNavigate();

  // Generate fixed seat data (10 seats A1, A2, A3,... A10)
  const generateSeats = () => {
    const seatNumbers = [];
    for (let i = 1; i <= 10; i++) {
      seatNumbers.push(`A${i}`);
    }
    return seatNumbers;
  };

  useEffect(() => {
    // Fetch seats for the movie from backend
    const fetchSeats = async () => {
      try {
        const response = await axios.get(`https://guvi-task-41.onrender.com/api/movies/${movieId}/seats`);
        const fetchedSeats = response.data.seats || [];
        // If backend returns seat data, update the state
        const seatsWithStatus = generateSeats().map(seat => {
          const seatData = fetchedSeats.find(s => s.seatNumber === seat);
          return seatData || { seatNumber: seat, status: 'available' }; // Default to 'available' if no data found
        });
        setSeats(seatsWithStatus); // Set the seat data with the status
      } catch (error) {
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
      <div>
        {seats.length > 0 ? (
          seats.map((seat) => (
            <button
              key={seat.seatNumber}
              disabled={seat.status === 'booked'}
              onClick={() => {
                if (selectedSeats.find((s) => s.seatNumber === seat.seatNumber)) {
                  handleSeatDeselect(seat); // Deselect the seat if already selected
                } else {
                  handleSeatSelect(seat); // Select the seat if not already selected
                }
              }}
              style={{
                backgroundColor:
                  seat.status === 'booked' ? 'gray' :
                  selectedSeats.find((s) => s.seatNumber === seat.seatNumber) ? 'green' : 'lightblue',
                margin: '5px',
                padding: '10px',
                width: '40px',
                height: '40px',
                textAlign: 'center',
                fontSize: '14px',
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
        <button onClick={handleBooking}>Book Tickets</button>
      </div>
    </div>
  );
};

export default SeatSelection;
