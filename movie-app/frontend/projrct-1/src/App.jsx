import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [booking, setBooking] = useState({
    movieId: '',
    userName: '',
    email: '',
    seats: 1,
  });

  useEffect(() => {
    axios.get('http://localhost:5000/movies')
      .then(response => setMovies(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleBooking = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/book', booking)
      .then(response => alert('Booking Successful!'))
      .catch(error => alert('Error: ' + error.message));
  };

  const handleChange = (e) => {
    setBooking({ ...booking, [e.target.name]: e.target.value });
  };

  return (
    <div className="App">
      <h1>Movie Booking System</h1>
      <div className="movie-list">
        <h2>Available Movies</h2>
        <ul>
          {movies.map(movie => (
            <li key={movie._id}>
              <h3>{movie.title}</h3>
              <p>{movie.description}</p>
              <p>Duration: {movie.duration}</p>
              <p>Genre: {movie.genre}</p>
              <p>Show Times: {movie.showTimes.join(', ')}</p>
              <button onClick={() => setBooking({ ...booking, movieId: movie._id })}>Book Now</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="booking-form">
        <h2>Book Your Tickets</h2>
        <form onSubmit={handleBooking}>
          <label>
            Name:
            <input type="text" name="userName" value={booking.userName} onChange={handleChange} required />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={booking.email} onChange={handleChange} required />
          </label>
          <label>
            Number of Seats:
            <input type="number" name="seats" value={booking.seats} onChange={handleChange} min="1" required />
          </label>
          <label>
            Movie Name:
            <input type="text" name="movieNmae" value={booking.movieName} onChange={handleChange} min="1" required />
          </label>
          <button type="submit">Confirm Booking</button>
        </form>
      </div>
    </div>
  );
}

export default App;
