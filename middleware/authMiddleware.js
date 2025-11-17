const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

exports.protect = async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) return res.redirect("/auth/login");

  const token = auth.split(" ")[1];
  if (!token) return res.redirect("/auth/login");

  try {
    const decoded = jwt.verify(token, "secretkey");
    req.user = await User.findById(decoded.id).lean();
    next();
  } catch {
    return res.redirect("/auth/login");
  }
};
