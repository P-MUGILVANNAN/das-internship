const User = require("../models/User");

// ----------------------------
// GET USER PROFILE
// ----------------------------
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};


// ----------------------------
// UPDATE USER PROFILE
// ----------------------------
exports.updateUserProfile = async (req, res) => {
  try {
    const { name, phone, email, age, gender } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, phone, email, age, gender },
      { new: true }
    ).select("-password");

    return res.json({
      message: "Profile updated successfully",
      user: updatedUser,
    });

  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
