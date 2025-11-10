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

// Connect MongoDB
connectDB();

const app = express();

// ✅ Allowed origins
const allowedOrigins = [
  "http://localhost:3000",
  "https://property-deller1-xr3z.vercel.app"
];

// ✅ CORS setup (Express 5 compatible)
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("❌ CORS blocked for:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Express body parser
app.use(express.json());

// ✅ Routes
app.use("/api/property", propertyRoutes);
app.use("/api/chatbot", chatbotRoutes);

// ✅ Health route
app.get("/", (req, res) => {
  res.send("✅ Backend running fine!");
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
