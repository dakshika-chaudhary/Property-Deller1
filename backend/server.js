const express = require("express");
const cors = require("cors");

const connectDB = require("./db");
const propertyRoutes = require("./routes/property");
const chatbotRoutes = require("./routes/chatbot");

 require("dotenv").config();

connectDB();

const app = express();
// https://property-deller1.vercel.app/
// app.use(cors({
//   origin: [
//     "http://localhost:3000",            
//     "https://property-deller1.vercel.app"
//   ],
//   credentials: true
// }));
const cors = require("cors");

app.use(cors({
  origin: [
    "http://localhost:3000",               // for local dev
    "https://property-deller1.vercel.app"  // for deployed frontend
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));


app.use(express.json());

app.use("/api/property", propertyRoutes);
app.use("/api/chatbot", chatbotRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));