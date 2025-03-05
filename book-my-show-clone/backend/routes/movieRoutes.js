const express = require("express");
const { getMovies, addMovie, getMovieById } = require("../controllers/movieController");
 const { protect } = require("../middleware/authMiddleware"); // Import auth middleware

const router = express.Router();

// Get all movies (Public Route)
router.get("/", getMovies);

router.get("/:id", getMovieById);


// Add a new movie (Protected Route - Requires JWT Token)
router.post("/", protect, addMovie);

module.exports = router;
