// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();
// const connectDB = require("./db");
// const propertyRoutes = require("./routes/property");
// const chatbotRoutes = require("./routes/chatbot");

 

// connectDB();

// const app = express();
// // https://property-deller1.vercel.app/
// // app.use(cors({
// //   origin: [
// //     "http://localhost:3000",            
// //     "https://property-deller1.vercel.app"
// //   ],
// //   credentials: true
// // }));


// app.use(cors({
//   origin: [
//     "http://localhost:3000",               // for local dev
//     // "https://property-deller1.vercel.app"  // for deployed frontend
//     "https://property-deller1-xr3z.vercel.app"
//   ],
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"],
//   credentials: true,
// }));


// app.use(express.json());

// app.use("/api/property", propertyRoutes);
// app.use("/api/chatbot", chatbotRoutes); 

// app.get("/", (req, res) => {
//   res.send("✅ Backend running fine!");
// });


// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./db");
const propertyRoutes = require("./routes/property");
const chatbotRoutes = require("./routes/chatbot");

// Connect to MongoDB
connectDB();

const app = express();

// ✅ Allowed Origins
const allowedOrigins = [
  "http://localhost:3000", // local dev
  "https://property-deller1-xr3z.vercel.app", // your Vercel frontend
];

// ✅ Configure CORS properly for Render
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("❌ CORS blocked for origin:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Handle preflight OPTIONS requests globally
app.options("*", cors());

// ✅ Middleware
app.use(express.json());

// ✅ Routes
app.use("/api/property", propertyRoutes);
app.use("/api/chatbot", chatbotRoutes);

// ✅ Root route (for Render health check)
app.get("/", (req, res) => {
  res.send("✅ Backend running fine!");
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
