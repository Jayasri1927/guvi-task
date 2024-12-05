const mongoose = require("mongoose");

const receipeSchema = new mongoose.Schema({
    receipesName: {
        id: Number,
        name:String,
        ingredients:String,
       
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