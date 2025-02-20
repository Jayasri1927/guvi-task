const express = require("express");
const { bookSeats, getBookings } = require("../controllers/bookingController");
const router = express.Router();

router.post("/", bookSeats);
router.get("/", getBookings);

module.exports = router;
