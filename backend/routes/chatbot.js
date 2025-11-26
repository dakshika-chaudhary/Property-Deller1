// const express = require("express");
// const router = express.Router();
// const csv = require("csv-parser");
// const Property = require("../models/Property");
// require("dotenv").config();
// const OpenAI = require("openai");
// const fetch = require("node-fetch"); // make sure to install this: npm install node-fetch
// const mongoose = require("mongoose");

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// // ✅ Google Drive direct link (convert /view to /uc?export=download)
// const CSV_URL =
//   "https://drive.google.com/uc?export=download&id=1JrMHATM0jZiibDAWPLVt8TAvCzSqRzQv";

// // ✅ Function to load CSV data from Google Drive
// const loadMarketData = async () => {
//   try {
//     const response = await fetch(CSV_URL);
//     const csvText = await response.text();

//     const lines = csvText.split("\n");
//     const headers = lines[0].split(",");
//     const results = [];

//     for (let i = 1; i < lines.length; i++) {
//       const row = lines[i].split(",");
//       if (row.length === headers.length) {
//         const obj = {};
//         headers.forEach((header, index) => {
//           obj[header.trim()] = row[index]?.trim();
//         });
//         results.push(obj);
//       }
//     }
//     return results;
//   } catch (error) {
//     console.error("Error loading CSV from Google Drive:", error);
//     return [];
//   }
// };

// router.post("/ask", async (req, res) => {
//   const { userId, question } = req.body;

//   try {
//     const userProperties = await Property.find({ userId }).limit(5);
//     const allProperties = await Property.find();
//     const marketData = await loadMarketData();

//     const prompt = `
// You are PropertyDeller's intelligent property assistant.
// The user has the following properties: ${JSON.stringify(userProperties)}.
// Market data sample: ${JSON.stringify(marketData.slice(0, 20))}.
// Answer the user's question in a helpful, friendly, and concise way.
// - Do not use bold, italics, or Markdown.
// - Maintain clear and readable alignment.
// - Use numbered points or bullet lists.
// - Include details: Price, Location, Carpet Area, Floor, Furnishing, Bathrooms, Balcony, Car Parking, and Status.
// - Provide complete answers; if tokens exceed, summarize neatly.
// User's question: "${question}"
// `;

//     const completion = await openai.chat.completions.create({
//       model: "gpt-4o-mini",
//       messages: [
//         { role: "system", content: "You are a helpful property expert assistant." },
//         { role: "user", content: prompt },
//       ],
//       max_tokens: 600,
//     });

//     const answer = completion.choices[0].message.content;
//     res.json({ answer });
//   } catch (err) {
//     console.error("Chatbot error:", err);
//     res.status(500).json({ error: "Chatbot failed to respond" });
//   }
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
const csv = require("csv-parser");
const Property = require("../models/Property");
require("dotenv").config();
const OpenAI = require("openai");
const fetch = require("node-fetch"); 
const mongoose = require("mongoose");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Google Drive CSV → make sure your link is set correctly
const CSV_URL =
  "https://drive.google.com/uc?export=download&id=1JrMHATM0jZiibDAWPLVt8TAvCzSqRzQv";

// -----------------------------
// LOAD MARKET DATA
// -----------------------------
const loadMarketData = async () => {
  console.log("⏳ Fetching CSV from Google Drive...");

  try {
    const response = await fetch(CSV_URL);
    console.log("✔ Google Drive Response Status:", response.status);

    const csvText = await response.text();
    console.log("✔ CSV Downloaded Successfully. Length:", csvText.length);

    const lines = csvText.split("\n");
    const headers = lines[0].split(",");
    const results = [];

    console.log("✔ CSV Headers:", headers);

    for (let i = 1; i < lines.length; i++) {
      const row = lines[i].split(",");
      if (row.length === headers.length) {
        const obj = {};
        headers.forEach((header, index) => {
          obj[header.trim()] = row[index]?.trim();
        });
        results.push(obj);
      }
    }

    console.log("✔ Parsed Market Data Rows:", results.length);
    return results;
  } catch (error) {
    console.error("❌ Error loading CSV from Google Drive:", error);
    return [];
  }
};

// -----------------------------
// CHATBOT ROUTE
// -----------------------------
router.post("/ask", async (req, res) => {
  const { userId, question } = req.body;

  console.log("\n---------------------------");
  console.log("📩 New /ask Request Received");
  console.log("User ID:", userId);
  console.log("User Question:", question);
  console.log("---------------------------\n");

  try {
    // 1️⃣ Fetch user properties
    console.log("⏳ Fetching user properties...");
    const userProperties = await Property.find({ userId }).limit(5);
    console.log("✔ User Properties Found:", userProperties.length);

    // 2️⃣ Fetch all properties
    console.log("⏳ Fetching all properties...");
    const allProperties = await Property.find();
    console.log("✔ All Properties Count:", allProperties.length);

    // 3️⃣ Load Market Data CSV
    const marketData = await loadMarketData();

    console.log("✔ Market Data Loaded:", marketData.length);

    // -----------------------------
    // CREATE PROMPT
    // -----------------------------
    const prompt = `
You are PropertyDeller's intelligent property assistant.
The user has the following properties: ${JSON.stringify(userProperties)}.
Market data sample: ${JSON.stringify(marketData.slice(0, 20))}.
Answer the user's question in a helpful, friendly, and concise way.
- Do not use bold, italics, or Markdown.
- Maintain clear and readable alignment.
- Use numbered points or bullet lists.
- Include details: Price, Location, Carpet Area, Floor, Furnishing, Bathrooms, Balcony, Car Parking, and Status.
- Provide complete answers; if tokens exceed, summarize neatly.
User's question: "${question}"
`;

    console.log("🧠 Final Prompt Sent To OpenAI:\n", prompt);

    // -----------------------------
    // OPENAI REQUEST
    // -----------------------------
    console.log("⏳ Sending request to OpenAI...");

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful property expert assistant." },
        { role: "user", content: prompt },
      ],
      max_tokens: 600,
    });

    console.log("✔ OpenAI Response Received");

    const answer = completion.choices[0].message.content;
    console.log("📝 Chatbot Answer:", answer);

    res.json({ answer });
  } catch (err) {
    console.error("❌ Chatbot Error:", err);
    res.status(500).json({ error: "Chatbot failed to respond" });
  }
});

module.exports = router;
