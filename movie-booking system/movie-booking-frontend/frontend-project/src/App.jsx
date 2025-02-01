import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import SeatSelection from './components/SeatSelection';
import BookingConfirmation from './components/BookingConfirmation';

const App = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  return (
    <Router>
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/login" element={<Login setUserLoggedIn={setUserLoggedIn} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/movies/:id/seats" element={<SeatSelection />} />
        <Route path="/booking-confirmation" element={<BookingConfirmation />} />
      </Routes>
    </Router>
  );
};

export default App;
