import React from "react";
import { Link } from "react-router-dom";


const Navbar = () => {
  return (
    <nav style={{
        backgroundColor: "#1c1c1c",
        padding: "15px",
        textAlign: "center",
        fontSize: "24px",
        fontWeight: "bold",
        boxShadow: "0px 2px 10px rgba(255, 255, 255, 0.1)"
      }}>
        Movie Booking System
      </nav>
  );
};

export default Navbar;
