const express = require("express");
const { getSeatsByMovie, addSeats } = require("../controllers/seatController");
const router = express.Router();

router.get("/:movieId/seats", getSeatsByMovie);
router.post("/", addSeats);

module.exports = router;
