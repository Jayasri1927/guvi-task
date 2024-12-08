const express = require("express");
const bodyParser = require ("body-parser");
const connectDB = require ("./config/dbConfig");
const authRoutes = require ("./routes/authRoutes");

require("dotenv").config();

const app = express();

app.use(bodyParser.json());

app.use("/", authRoutes);

// app.get("/:universalURL", (req, res) => {
//     res.send("404 URL NOT FOUND");
// });

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});