const express = require("express");
const { getSeatsByMovie, addSeats } = require("../controllers/seatController");
const router = express.Router();
const { bookSeats } = require("../controllers/bookingController");

router.post("/book", bookSeats);
router.get("/:movieId/seats", getSeatsByMovie);
router.post("/", addSeats);

module.exports = router;
