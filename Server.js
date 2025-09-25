const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const recordRoutes = require("./routes/recordRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/healthDb")
  .then(() => console.log(" MongoDB Connected"))
  .catch((err) => console.log("DB Error:", err));

// Routes
app.use("/auth", authRoutes);
app.use("/appointments", appointmentRoutes);
app.use("/records", recordRoutes);

// Public pages
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

const PORT = 1891;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));