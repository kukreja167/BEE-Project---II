// controller/authController.js
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const createToken = (id) =>
  jwt.sign({ id }, "secretkey", { expiresIn: "1d" });

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });
    await user.save();
    return res.redirect("/auth/login");
  } catch (err) {
<<<<<<< HEAD:controller/authController.js
    console.error("Register error:", err);
    res.status(500).send("Error registering user");
=======
    res.status(500).json({ error: err.message });
>>>>>>> d1324ca6ecaa93a5fcda205fe291c83889ee1faa:controllers/authController.js
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).send("Invalid credentials");
    }

    const token = createToken(user._id);
    res.cookie("token", token, { httpOnly: true });
    return res.redirect("/dashboard");
  } catch (err) {
<<<<<<< HEAD:controller/authController.js
    console.error("Login error:", err);
    res.status(500).send("Error logging in");
=======
    res.status(500).json({ error: err.message });
>>>>>>> d1324ca6ecaa93a5fcda205fe291c83889ee1faa:controllers/authController.js
  }
};
