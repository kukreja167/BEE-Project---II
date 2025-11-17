// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
<<<<<<< HEAD
const User = require("../models/user");
=======
const User = require("../models/User.js");

exports.protect = async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) return res.redirect("/auth/login");

  const token = auth.split(" ")[1];
  if (!token) return res.redirect("/auth/login");
>>>>>>> d1324ca6ecaa93a5fcda205fe291c83889ee1faa

exports.protect = async (req, res, next) => {
  try {
<<<<<<< HEAD
    const token = req.cookies?.token;
    if (!token) return res.redirect("/auth/login");

    const decoded = jwt.verify(token, "secretkey"); // same secret as in authController
    const user = await User.findById(decoded.id);
    if (!user) return res.redirect("/auth/login");

    req.user = user;
    next();
  } catch (err) {
    console.error("Auth error:", err);
=======
    const decoded = jwt.verify(token, "secretkey");
    req.user = await User.findById(decoded.id).lean();
    next();
  } catch {
>>>>>>> d1324ca6ecaa93a5fcda205fe291c83889ee1faa
    return res.redirect("/auth/login");
  }
};
