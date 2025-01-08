const express = require("express");
const Recipes = require("../models/receipesModel");

const router = express.Router();

//create a new receipes

router.post("/app", async (req,res) => {
    const {recipeName, difficulty, rating, reviewCount, mealType} = req.body;

    try {
       const recipes = new Recipes ({recipeName, difficulty, rating, reviewCount, mealType});
       await recipes.save();
       res.send(recipes);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal serve error"});
    }
});



//get all receipe 

router.get('/', async (req,res) => {
   try {
    const recipes = await Recipes.find({});
    res.send(recipes);
   } catch (error) {
    console.error(error);
    res.status(500).send(error);
   }
});

//get receipes by id

router.get('/app/:id', (req,res) => {
    const recipeId = parseInt(req.params.id);
    const recipe = Recipes.find((recipe) => recipe.id === recipeId);
    if (!recipe) {
        res.status(404).json({erroe: "Receipe not found"});
    }else {
        res.json(recipe);
    }
});


//update a receipe by id

router.put('/app/:id', async (req,res) => {
    const {id} = req.params;
    const {recipeName, difficulty, rating, reviewCount, mealType} = req.body;

    try {
        const recipe = await Recipes.findByIdAndUpdate(id, {recipeName, difficulty, rating, reviewCount, mealType}, {new: true});
        res.send(recipe);
    } catch (error) {
        console.error(error);
        res.status(500).send (error);
    }
});


//delete a receipe

router.delete('/app/:id', async (req,res) => {
    const {id} = req.params;

    try {
        const recipe =  await Recipes.findByIdAndDelete(id);
        res.send(recipe);
    } catch (error) {
        console.error (error);
        res.status(500).send(error);
    }
});

module.exports = router;