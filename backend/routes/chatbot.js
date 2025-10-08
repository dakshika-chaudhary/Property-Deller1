const express = require("express");
const router = express.Router();
const fs = require("fs");
const csv = require("csv-parser");
const Property = require("../models/Property");
require("dotenv").config(); // <-- move this up
const OpenAI = require("openai");
const mongoose = require("mongoose");


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const loadMarketData = async()=>{
    return new Promise((resolve,reject)=>{
        const results = [];
        fs.createReadStream("../data/cleaned_data_final.csv")
        .pipe(csv())
        .on("data",(data)=>results.push(data))
         .on("end", () => resolve(results))
      .on("error", (err) => reject(err));
    });
};

router.post("/ask",async(req,res)=>{
     const { userId, question } = req.body;

     try{
      const userProperties = await Property.find({ userId }).limit(5);

        // Fetch user's recent properties
// let userProperties = [];
// if (mongoose.Types.ObjectId.isValid(userId)) {
//   userProperties = await Property.find({ userId }).limit(5);
// }
        // Load market data
        const marketData = await loadMarketData();

         let prompt = `
You are PropertyDeller's intelligent property assistant.
The user has the following properties: ${JSON.stringify(userProperties)}.
Market data sample: ${JSON.stringify(marketData.slice(0, 20))}.
Answer the user's question in a helpful, friendly, and concise way.
Answer the user's question in a **clear and readable format**.
- Do not use bold, italics, or any Markdown.
- the alignment should be proper and clearn.
-Should be properly formated and should not be confusing to read.
- List properties one by one.
- Include key details like Price, Location, Carpet Area, Floor, Furnishing, Bathrooms, Balcony, Car Parking, and Status.
- Use bullets or numbering and separate each property with line breaks for readability.
-do provide complete points do not stop in between. If tokens exceeds modefy the answer accordingly.
If relevant, suggest better properties, upgrades, or price strategies.
User's question: "${question}"
`;

 // Call OpenAI GPT API
 const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful property expert assistant." },
        { role: "user", content: prompt },
      ],
      max_tokens: 600,
    });

     const answer = completion.choices[0].message.content;
    res.json({ answer });
     }  
    
     catch(err){
        console.error("Chatbot error:", err);
        res.status(500).json({ error: "Chatbot failed to respond" });
     }
})

module.exports = router;