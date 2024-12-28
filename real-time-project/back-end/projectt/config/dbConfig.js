const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/news-task");
       
        console.log("Database Connected");
    } catch (error) {
        console.log("Database connection failed");
    }
};

module.exports = connectDB;