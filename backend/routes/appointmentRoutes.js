const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");

const {
  bookAppointment,
  getUserAppointments,
  cancelAppointment,
  getAllAppointments,
  approveAppointment,
  rejectAppointment,
} = require("../controllers/appointmentController");

/**
 * @swagger
 * tags:
 *   name: Appointments
 *   description: User & Admin Appointment Management
 */

/**
 * @swagger
 * /api/appointments/book:
 *   post:
 *     summary: Book a new appointment
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               doctorId:
 *                 type: string
 *               date:
 *                 type: string
 *                 example: "2025-12-01"
 *               time:
 *                 type: string
 *                 example: "10:30 AM"
 *     responses:
 *       201:
 *         description: Appointment booked successfully
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: Unauthorized
 */
router.post("/book", protect, bookAppointment);

/**
 * @swagger
 * /api/appointments/user:
 *   get:
 *     summary: Get all appointments for logged-in user
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user appointments
 *       401:
 *         description: Unauthorized
 */
router.get("/user", protect, getUserAppointments);

/**
 * @swagger
 * /api/appointments/cancel/{id}:
 *   put:
 *     summary: Cancel a booked appointment
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Appointment ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Appointment cancelled successfully
 *       404:
 *         description: Appointment not found
 *       401:
 *         description: Unauthorized
 */
router.put("/cancel/:id", protect, cancelAppointment);

/**
 * @swagger
 * /api/appointments:
 *   get:
 *     summary: Get all appointments (Admin Only)
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all appointments
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden – Admin access only
 */
router.get("/", protect, adminOnly, getAllAppointments);

/**
 * @swagger
 * /api/appointments/approve/{id}:
 *   put:
 *     summary: Approve an appointment (Admin Only)
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Appointment ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Appointment approved successfully
 *       404:
 *         description: Appointment not found
 *       403:
 *         description: Forbidden – Admin access only
 */
router.put("/approve/:id", protect, adminOnly, approveAppointment);

/**
 * @swagger
 * /api/appointments/reject/{id}:
 *   put:
 *     summary: Reject an appointment (Admin Only)
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Appointment ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Appointment rejected successfully
 *       404:
 *         description: Appointment not found
 *       403:
 *         description: Forbidden – Admin access only
 */
router.put("/reject/:id", protect, adminOnly, rejectAppointment);

module.exports = router;