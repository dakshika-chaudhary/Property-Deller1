const express = require('express');
const router = express.Router();
const axios = require('axios');
const Property = require('../models/Property');


router.post("/predict", async (req, res) => {
  try {
    const mlRequest = {
      location: req.body.location,
      Status: req.body.status,
      Floor: req.body.floor,
      Transaction: req.body.transaction,
      Furnishing: req.body.furnishing,
      facing: req.body.facing,
      overlooking: req.body.overlooking,
      Ownership: req.body.ownership,
      Carpet_Area: req.body.carpetArea,
      Bathroom: req.body.bathroom,
      Balcony: req.body.balcony,
      Car_Parking: req.body.carParking,
      Super_Area: req.body.superArea,
    };

    const response = await axios.post("http://127.0.0.1:8000/predict", mlRequest);
    res.json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Prediction failed" });
  }
});

// router.post("/predict",async(req,res)=>{
//     try{
//     const response = await axios.post("http://127.0.0.1:8000/predict", req.body);
//     res.json(response.data);
//     }
//     catch(err){
//     console.error(err);
//     res.status(500).json({ error: "Prediction failed" });
//     }
// });

router.post("/save", async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: "Invalid or missing userId" });

    // Map frontend fields to ML API expected format
    const mlRequest = {
      location: req.body.location,
      Status: req.body.status,           // Capital S
      Floor: req.body.floor,
      Transaction: req.body.transaction,
      Furnishing: req.body.furnishing,
      facing: req.body.facing,
      overlooking: req.body.overlooking,
      Ownership: req.body.ownership,
      Carpet_Area: req.body.carpetArea,  // underscore
      Bathroom: req.body.bathroom,
      Balcony: req.body.balcony,
      Car_Parking: req.body.carParking,  // underscore
      Super_Area: req.body.superArea,    // underscore
    };

    // Call ML API to get predicted price
    const mlResponse = await axios.post("http://127.0.0.1:8000/predict", mlRequest);
    const predictedPrice = mlResponse.data["Predicted Price (in rupees)"] || null;

    // Save property to MongoDB with predicted price
    const property = new Property({
      ...req.body,       // includes userId and form fields
      predictedPrice,    // add predicted price
    });

    await property.save();

    res.json({ message: "Property saved successfully", property });
  } catch (err) {
    console.error("Error saving property:", err.response?.data || err.message);
    res.status(500).json({ error: "Saving failed" });
  }
});

module.exports = router;


// router.post("/save",async(req,res)=>{
//     try{
//     const { userId } = req.body;
//     if (!userId) return res.status(400).json({ error: "Invalid or missing userId" });

//        const property = new Property(req.body);
//        await property.save();
//        res.json({ message: "Property saved successfully", property });
//     }
//     catch(err){
//             console.error("Error saving:", err);
//        res.status(500).json({ error: "Saving failed" }); 
//     }
// })

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


router.get("/trending",async(req,res)=>{
  try{
const sevenDaysAgo = new Date();
sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const trending = await Property.find({ createdAt: { $gte: sevenDaysAgo } })
      .sort({ views: -1 })
      .limit(10);

    res.json(trending);
  }
  catch(err){
     console.error(err);
    res.status(500).json({ error: "Failed to fetch trending properties" });
  }
})




module.exports = router;