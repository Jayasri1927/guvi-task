import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // Wrap with AuthProvider
import Navbar from "./components/Navbar";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import MovieList from "./components/MovieList";
import SeatSelection from "./components/SeatSelection";
import BookingConfirmation from "./components/BookingConfirmation";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div style={{ backgroundColor: "#121212", color: "white", minHeight: "100vh", paddingBottom: "20px" }}>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/movie" element={<MovieList />} />
              <Route path="/movie/:movieId/seats" element={<SeatSelection />} />
              <Route path="/booking-confirmation" element={<BookingConfirmation />} />
            </Route>

            {/* Redirect unknown routes to login */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
