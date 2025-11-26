const User = require("../models/User");
const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");
const Admin = require("../models/Admin");

// ----------------------------
// ADMIN DASHBOARD ANALYTICS
// ----------------------------
exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalDoctors = await Doctor.countDocuments();
    const totalAppointments = await Appointment.countDocuments();
    const pendingAppointments = await Appointment.countDocuments({
      status: "pending",
    });

    return res.json({
      totalUsers,
      totalDoctors,
      totalAppointments,
      pendingAppointments,
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};


// ----------------------------
// GET ALL USERS
// ----------------------------
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); 
    return res.json({ users });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};


// ----------------------------
// GET ADMIN PROFILE
// ----------------------------
exports.getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id).select("-password");

    return res.json({ admin });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};


// ----------------------------
// UPDATE ADMIN PROFILE
// ----------------------------
exports.updateAdminProfile = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findById(req.user.id);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    if (email) admin.email = email;
    if (password) admin.password = password; // Will be hashed by pre-save hook

    await admin.save();

    return res.json({ message: "Profile updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
