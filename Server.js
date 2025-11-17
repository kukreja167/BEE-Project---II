const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const recordRoutes = require("./routes/recordRoutes");
const hospitalRoutes = require("./routes/hospitalRoutes");
const reportRoutes = require("./routes/reportRoutes");
const { protect } = require("./middleware/authMiddleware");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

mongoose
  .connect("mongodb://127.0.0.1:27017/healthDb")
  .then(() => console.log(" MongoDB Connected"))
  .catch((err) => console.log("DB Error:", err));

app.use("/auth", authRoutes);
app.use("/appointments", protect, appointmentRoutes);
app.use("/records", protect, recordRoutes);
app.use("/hospitals", protect, hospitalRoutes);
app.use("/reports", protect, reportRoutes);

app.get("/", (req, res) => res.render("index"));
app.get("/dashboard", protect, (req, res) => res.render("dashboard", { user: req.user }));

const PORT = 1891;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
