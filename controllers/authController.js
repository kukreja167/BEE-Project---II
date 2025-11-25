
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const createToken = (id) =>
  jwt.sign({ id }, "secretkey", { expiresIn: "1d" });

exports.register = async (req, res) => {
  try {
    const { name, email, password, role, specialization } = req.body;
    if (!name || !email || !password || !role)
      return res.status(400).send("Missing fields");

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).send("User already exists");

    const user = new User({ name, email, password, role, specialization });
    await user.save();
    return res.redirect("/auth/login");
  } catch (err) {
    console.error("register:", err);
    return res.status(500).send("Server error");
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).send("Invalid credentials");
    }

    const token = createToken(user._id);
    res.cookie("token", token, { httpOnly: true });
    return res.redirect("/dashboard");
  } catch (err) {

    console.error("Login error:", err);
    res.status(500).send("Error logging in");

    res.status(500).json({ error: err.message });

  }
};
