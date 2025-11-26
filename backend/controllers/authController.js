const User = require("../models/User");
const Admin = require("../models/Admin");
const generateToken = require("../utils/generateToken");

// ----------------------------
// USER REGISTER
// ----------------------------
exports.registerUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // Check all fields
    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user exists
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      phone,
      password,
    });

    return res.status(201).json({
      message: "Registration successful",
      token: generateToken(user._id),
      user,
    });

  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};


// ----------------------------
// USER LOGIN
// ----------------------------
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate fields
    if (!email || !password) {
      return res.status(400).json({ message: "Email & password required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    return res.json({
      message: "Login successful",
      token: generateToken(user._id),
      user,
    });

  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};


// ----------------------------
// ADMIN LOGIN
// ----------------------------
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate fields
    if (!email || !password) {
      return res.status(400).json({ message: "Email & password required" });
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    return res.json({
      message: "Admin login successful",
      token: generateToken(admin._id),
      admin,
    });

  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
