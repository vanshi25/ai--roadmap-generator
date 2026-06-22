const express = require("express");
const cors = require("cors");
const roadmapRoutes = require("./routes/roadmapRoutes");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/roadmap", roadmapRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Roadmap Generator API Running",
  });
});

module.exports = app;