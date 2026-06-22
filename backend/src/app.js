// const express = require("express");
// const cors = require("cors");
// const roadmapRoutes = require("./routes/roadmapRoutes");
// const connectDB = require("./config/db");
// const authRoutes = require("./routes/authRoutes");

// const app = express();

// connectDB();

// app.use(cors());
// app.use(express.json());

// app.use("/api/auth", authRoutes);
// app.use("/api/roadmap", roadmapRoutes);

// app.get("/", (req, res) => {
//   res.json({
//     success: true,
//     message: "Roadmap Generator API Running",
//   });
// });

// module.exports = app;






const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Ensure env variables are loaded
const roadmapRoutes = require("./routes/roadmapRoutes");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();

// 1. Connect to MongoDB Database
connectDB();

// 2. Premium CORS handler to ensure authorization tokens clear easily
app.use(cors({
  origin: "*", // Or specific address like "http://localhost:5173"
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// 3. API Route Mapping
app.use("/api/auth", authRoutes);
app.use("/api/roadmap", roadmapRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Roadmap Generator API Running",
  });
});

// 🌟 CRITICAL FIX: Direct Port Allocation and Listening Loop Setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 ============================================`);
  console.log(`🔥 SERVER LIVE & RUNNING ON PORT: http://localhost:${PORT}`);
  console.log(`🚀 ============================================`);
});

module.exports = app;