// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const { register, login } = require("../controller/authController");
<<<<<<< HEAD
=======

router.get("/register", (req, res) => res.render("register"));
router.get("/login", (req, res) => res.render("login"));
>>>>>>> master

router.post("/register", register);
router.post("/login", login);

module.exports = router;
