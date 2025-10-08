const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db");
const propertyRoutes = require("./routes/property");
const chatbotRoutes = require("./routes/chatbot");

require("dotenv").config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/property", propertyRoutes);
app.use("/api/chatbot", chatbotRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));