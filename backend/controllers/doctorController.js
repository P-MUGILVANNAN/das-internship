const Doctor = require("../models/Doctor");

// ----------------------------
// GET ALL DOCTORS (Public)
// ----------------------------
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    return res.json({ doctors });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// ----------------------------
// GET SINGLE DOCTOR (Public)
// ----------------------------
exports.getSingleDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    return res.json({ doctor });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// ----------------------------
// ADD DOCTOR (Admin)
// ----------------------------
exports.addDoctor = async (req, res) => {
  try {
    const { name, email, specialization, experience, fees, timings, image } = req.body;

    const exists = await Doctor.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Doctor already exists" });
    }

    const doctor = await Doctor.create({
      name,
      email,
      specialization,
      experience,
      fees,
      timings,
      image,
    });

    return res.status(201).json({
      message: "Doctor added successfully",
      doctor,
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// ----------------------------
// UPDATE DOCTOR (Admin)
// ----------------------------
exports.updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    return res.json({
      message: "Doctor updated successfully",
      doctor,
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// ----------------------------
// DELETE DOCTOR (Admin)
// ----------------------------
exports.deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    return res.json({ message: "Doctor deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
