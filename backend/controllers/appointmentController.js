const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");

// ----------------------------
// USER: BOOK APPOINTMENT
// ----------------------------
exports.bookAppointment = async (req, res) => {
  try {
    const { doctorId, date, time } = req.body;

    if (!doctorId || !date || !time) {
      return res.status(400).json({ message: "All fields required" });
    }

    // Check doctor exists
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const appointment = await Appointment.create({
      userId: req.user.id,
      doctorId,
      date,
      time,
      status: "pending",
    });

    return res.status(201).json({
      message: "Appointment booked successfully",
      appointment,
    });

  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// ----------------------------
// USER: GET OWN APPOINTMENTS
// ----------------------------
exports.getUserAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.user.id })
      .populate("doctorId", "name specialization fees timings");

    return res.json({ appointments });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// ----------------------------
// USER: CANCEL APPOINTMENT
// ----------------------------
exports.cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (appointment.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    appointment.status = "cancelled";
    await appointment.save();

    return res.json({ message: "Appointment cancelled successfully" });

  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// ----------------------------
// ADMIN: GET ALL APPOINTMENTS
// ----------------------------
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("userId", "name email phone")
      .populate("doctorId", "name specialization");

    return res.json({ appointments });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// ----------------------------
// ADMIN: APPROVE APPOINTMENT
// ----------------------------
exports.approveAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = "approved";
    await appointment.save();

    return res.json({ message: "Appointment approved successfully" });

  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// ----------------------------
// ADMIN: REJECT APPOINTMENT
// ----------------------------
exports.rejectAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = "rejected";
    await appointment.save();

    return res.json({ message: "Appointment rejected successfully" });

  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
