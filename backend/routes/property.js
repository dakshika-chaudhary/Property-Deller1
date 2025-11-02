const express = require('express');
const router = express.Router();
const axios = require('axios');
const Property = require('../models/Property');


router.post("/predict", async (req, res) => {
  try {
  
const payload = {
  location: req.body.location,
  Status: req.body.status,
  Floor: req.body.floor,
  Transaction: req.body.transaction,
  Furnishing: req.body.furnishing,
  facing: req.body.facing,
  overlooking: req.body.overlooking,
  Ownership: req.body.ownership,
  Carpet_Area: req.body.carpet_area,
  Bathroom: req.body.bathroom,
  Balcony: req.body.balcony,
  Car_Parking: req.body.car_parking,
  Super_Area: req.body.super_area,
};


// const mlResponse = await axios.post(
//   "https://property-deller1-1.onrender.com/predict",  // or your local ML API: http://127.0.0.1:8000/predict
//   payload,
//   { headers: { "Content-Type": "application/json" } }
// );

    const response = await axios.post("https://property-deller1-1.onrender.com/predict", 
      payload,{
  headers: { "Content-Type": "application/json" },
});
   const price =
      response.data["Predicted Price (in rupees)"] ??
      response.data.predictedPrice ??
      response.data.predicted_price ??
      null;
    // const response = await axios.post("http://127.0.0.1:8000/predict", mlRequest);
    res.json({ predictedPrice: price });
    console.log("ML API Response:", response.data);

  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Prediction failed" });
  }
});

router.post("/save", async (req, res) => {
  try {
    const {
      userId,
      location,
      status,
      floor,
      transaction,
      furnishing,
      facing,
      overlooking,
      ownership,
      carpet_area,
      bathroom,
      balcony,
      car_parking,
      super_area,
      predictedPrice,
    } = req.body;

    // 🧩 Debug log
    console.log("Incoming property save data:", req.body);

    // ✅ Validate required fields
    if (!userId || !location) {
      return res.status(400).json({
        error: "userId and location are required",
        received: { userId, location },
      });
    }

    // ✅ Create and save the property
    const property = new Property({
      userId,
      location,
      status: status || "Unknown",
      floor: floor || "Unknown",
      transaction: transaction || "Unknown",
      furnishing: furnishing || "Unknown",
      facing: facing || "Unknown",
      overlooking: overlooking || "Unknown",
      ownership: ownership || "Unknown",
      carpet_area: Number(carpet_area) || 0,
      bathroom: Number(bathroom) || 0,
      balcony: Number(balcony) || 0,
      car_parking: Number(car_parking) || 0,
      super_area: Number(super_area) || 0,
      predictedPrice: Number(predictedPrice) || 0,
    });

    await property.save();
    console.log("✅ Property saved successfully:", property);

    res.status(201).json({
      message: "✅ Property saved successfully",
      property,
    });
  } catch (err) {
    console.error("❌ Error saving property:", err);
    res.status(500).json({
      error: "Saving failed",
      details: err.message || err,
    });
  }
});


// router.post("/save", async (req, res) => {
//   try {
//     const {
//       userId,
//       location,
//       status,
//       floor,
//       transaction,
//       furnishing,
//       facing,
//       overlooking,
//       ownership,
//       carpet_area,
//       bathroom,
//       balcony,
//       car_parking,
//       super_area,
//       predictedPrice,
//     } = req.body;

//     // ✅ Check required fields first
//     if (!userId || !location) {
//       return res.status(400).json({ error: "userId and location are required" });
//     }

//     const property = new Property({
//       userId,
//       location,
//       status,
//       floor,
//       transaction,
//       furnishing,
//       facing,
//       overlooking,
//       ownership,
//       carpet_area,
//       bathroom,
//       balcony,
//       car_parking,
//       super_area,
//       predictedPrice,
//     });

//     await property.save();

//     res.status(201).json({
//       message: "✅ Property saved successfully",
//       property,
//     });
//   } catch (err) {
//     console.error("Error saving property:", err);
//     res.status(500).json({
//       error: "Saving failed",
//       details: err.message,
//     });
//   }
// });



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