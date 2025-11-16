// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.protect = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) return res.redirect("/auth/login");

    const decoded = jwt.verify(token, "secretkey"); // same secret as in authController
    const user = await User.findById(decoded.id);
    if (!user) return res.redirect("/auth/login");

    req.user = user;
    next();
  } catch (err) {
    console.error("Auth error:", err);
    return res.redirect("/auth/login");
  }
};
