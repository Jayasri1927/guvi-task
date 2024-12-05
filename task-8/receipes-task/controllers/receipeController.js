const express = require("express");
const Receipes = require("../models/receipesModel");

const router = express.Router();

//create a new receipes

router.post("/app", async (req,res) => {
    const {receipesName, difficulty, rating, reveiewCount, mealType} = req.body;

    try {
       const receipes = new Receipes ({receipesName, difficulty, rating, reveiewCount, mealType});
       await receipes.save();
       res.send(receipes);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal serve error"});
    }
});



//get all receipe 

router.get('/app', async (req,res) => {
   try {
    const receipes = await Receipes.find({});
    res.send(receipes);
   } catch (error) {
    console.error(error);
    res.status(500).send(error);
   }
});

//get receipes by id

router.get('/app/:id', (req,res) => {
    const receipeId = parseInt(req.params.id);
    const receipe = Receipes.find((receipe) => receipe.id === receipeId);
    if (!receipe) {
        res.status(404).json({erroe: "Receipe not found"});
    }else {
        res.json(receipe);
    }
});


//update a receipe by id

router.put('/app/:id', async (req,res) => {
    const {id} = req.params;
    const {receipesName, difficulty, rating, reveiewCount, mealType} = req.body;

    try {
        const receipe = await Receipes.findByIdAndUpdate(id, {receipesName, difficulty, rating, reveiewCount, mealType}, {new: true});
        res.send(receipe);
    } catch (error) {
        console.error(error);
        res.status(500).send (error);
    }
});


//delete a receipe

router.delete('/app/:id', async (req,res) => {
    const {id} = req.params;

    try {
        const receipe =  await Receipes.findByIdAndDelete(id);
        res.send(receipe);
    } catch (error) {
        console.error (error);
        res.status(500).send(error);
    }
});

module.exports = router;