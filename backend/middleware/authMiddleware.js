const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Admin = require("../models/Admin");

exports.protect = async (req, res, next) => {
  let token;

  // Check Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find user or admin based on ID
      const user = await User.findById(decoded.id).select("-password");
      const admin = await Admin.findById(decoded.id).select("-password");

      if (user) {
        req.user = user; // store user in request
      } else if (admin) {
        req.user = admin;
      } else {
        return res.status(404).json({ message: "User not found" });
      }

      next();
    } catch (err) {
      return res.status(401).json({ message: "Not authorized", error: err.message });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, token missing" });
  }
};
