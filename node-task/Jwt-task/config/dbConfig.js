const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://jayasrig2002:fJo0IXJn6VdF4Kok@cluster0.rctd7.mongodb.net/usermanagement");
        console.log("Database Connected");
    } catch (error) {
        console.log("Database connection failed");
    }
};

module.exports = connectDB;