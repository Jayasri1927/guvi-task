const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({

    recipeName: {
        type:String,
       
    },
    difficulty: {
        type: String,
       
    },
    rating: {
        type:Number,
      
    },
    reviewCount: {
        type: Number,
      
    },
    mealType: {
        type: String,
       
    }
});

const Recipes = mongoose.model("Recipes", recipeSchema);

module.exports = Recipes;