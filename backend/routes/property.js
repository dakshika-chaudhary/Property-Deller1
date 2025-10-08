const express = require('express');
const router = express.Router();
const axios = require('axios');
const Property = require('../models/Property');

router.post("/predict",async(req,res)=>{
    try{
    const response = await axios.post("http://127.0.0.1:8000/predict", req.body);
    res.json(response.data);
    }
    catch(err){
    console.error(err);
    res.status(500).json({ error: "Prediction failed" });
    }
});

router.post("/save",async(req,res)=>{
    try{
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: "Invalid or missing userId" });

       const property = new Property(req.body);
       await property.save();
       res.json({ message: "Property saved successfully", property });
    }
    catch(err){
            console.error("Error saving:", err);
       res.status(500).json({ error: "Saving failed" }); 
    }
})

// GET properties by userId
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ error: "Invalid userId" });

    const properties = await Property.find({ userId }).sort({ createdAt: -1 });
    res.json({ properties });
  } catch (err) {
    console.error("Error fetching properties:", err);
    res.status(500).json({ error: "Failed to fetch properties" });
  }
});


module.exports = router;