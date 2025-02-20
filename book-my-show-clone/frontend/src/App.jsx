import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import MovieDetails from "./components/MovieDetails";
import MovieList from "./components/MovieList"
import SeatSelection from "./components/SeatSelection";
import BookingConfirmation from "./components/BookingConfirmation";

const App = () => {
  return (
    <Router>
      <div style={{ backgroundColor: "#121212", color: "white", minHeight: "100vh", paddingBottom: "20px" }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/movies/:movieId/seats" element={<SeatSelection />} />
          <Route path="/booking-confirmation" element={<BookingConfirmation />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;


