import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BookingForm = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [seats, setSeats] = useState(1);
  const [customerName, setCustomerName] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/api/movies/${movieId}`)
      .then(response => setMovie(response.data))
      .catch(err => console.log(err));
  }, [movieId]);

  const handleBooking = () => {
    axios.post('http://localhost:5000/api/bookings', {
      movieId: movie.id,
      movieTitle: movie.title,
      seats,
      customerName,
    })
      .then(response => alert('Booking successful'))
      .catch(err => alert('Booking failed'));
  };

  return (
    <div>
      <h2>Book Tickets for {movie.title}</h2>
      <div>
        <label>Your Name:</label>
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
      </div>
      <div>
        <label>Seats: </label>
        <input
          type="number"
          value={seats}
          onChange={(e) => setSeats(e.target.value)}
          min="1"
        />
      </div>
      <button onClick={handleBooking}>Book Now</button>
    </div>
  );
};

export default BookingForm;
