const express  = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require ("./routes/user-router");
const adminRouter = require("./routes/admin-router.js");
const movieRouter = require("./routes/movie-router");
const bookingsRouter = require("./routes/booking-router");
const cors = require("cors");
const connectDB = require("./db/configDB.js");

require("dotenv").config();
const app = express();
connectDB();



// middlewears
app.use(cors());
app.use(express.json())
  app.use("/user", userRouter);
  app.use("/admin", adminRouter);
  app.use("/movie", movieRouter);
   app.use("/booking",bookingsRouter);



   const PORT = process.env.PORT || 3000;
   app.listen(PORT, function () {
     console.log(`Server is running at port ${PORT}`);
   });

 


  