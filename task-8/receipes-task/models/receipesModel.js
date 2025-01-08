const mongoose = require("mongoose");

const receipeSchema = new mongoose.Schema({
    receipesName: {
        type:String,
       
    },
    difficulty: {
        type: String,
       
    },
    rating: {
        type:Number,
      
    },
    reveiewCount: {
        type: Number,
      
    },
    mealType: {
        type: String,
       
    },
});

const Receipes = mongoose.model("Receipes", receipeSchema);

module.exports = Receipes;