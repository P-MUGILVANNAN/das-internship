const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");

const {
  getAllDoctors,
  getSingleDoctor,
  addDoctor,
  updateDoctor,
  deleteDoctor,
} = require("../controllers/doctorController");

/**
 * @swagger
 * tags:
 *   name: Doctors
 *   description: Doctor Management APIs
 */

/**
 * @swagger
 * /api/doctors:
 *   get:
 *     summary: Get all doctors (Public)
 *     tags: [Doctors]
 *     responses:
 *       200:
 *         description: List of all doctors
 */
router.get("/", getAllDoctors);

/**
 * @swagger
 * /api/doctors/{id}:
 *   get:
 *     summary: Get details of a single doctor (Public)
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Doctor ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Doctor details fetched successfully
 *       404:
 *         description: Doctor not found
 */
router.get("/:id", getSingleDoctor);

/**
 * @swagger
 * /api/doctors:
 *   post:
 *     summary: Add a new doctor (Admin Only)
 *     tags: [Doctors]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               specialization:
 *                 type: string
 *               experience:
 *                 type: number
 *               fees:
 *                 type: number
 *               availableDays:
 *                 type: array
 *                 items:
 *                   type: string
 *               availableTime:
 *                 type: string
 *                 example: "10:00 AM - 5:00 PM"
 *     responses:
 *       201:
 *         description: Doctor added successfully
 *       403:
 *         description: Forbidden – Admin access only
 */
router.post("/", protect, adminOnly, addDoctor);

/**
 * @swagger
 * /api/doctors/{id}:
 *   put:
 *     summary: Update doctor information (Admin Only)
 *     tags: [Doctors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Doctor ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               specialization:
 *                 type: string
 *               experience:
 *                 type: number
 *               fees:
 *                 type: number
 *               availableDays:
 *                 type: array
 *                 items:
 *                   type: string
 *               availableTime:
 *                 type: string
 *     responses:
 *       200:
 *         description: Doctor updated successfully
 *       404:
 *         description: Doctor not found
 *       403:
 *         description: Forbidden – Admin only
 */
router.put("/:id", protect, adminOnly, updateDoctor);

/**
 * @swagger
 * /api/doctors/{id}:
 *   delete:
 *     summary: Delete a doctor (Admin Only)
 *     tags: [Doctors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Doctor ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Doctor deleted successfully
 *       404:
 *         description: Doctor not found
 *       403:
 *         description: Forbidden – Admin only
 */
router.delete("/:id", protect, adminOnly, deleteDoctor);

module.exports = router;