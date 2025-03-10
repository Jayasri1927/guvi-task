const express = require("express");
const { deleteBooking, getBookingById, newBooking } = require ("../controller/booking-controller");

const bookingsRouter = express.Router();

bookingsRouter.get("/:id", getBookingById);
bookingsRouter.post("/", newBooking);
bookingsRouter.delete("/:id", deleteBooking);


module.exports =  bookingsRouter;