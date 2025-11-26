const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { getUserProfile, updateUserProfile } = require("../controllers/userController");

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User Profile Management
 */

/**
 * @swagger
 * /api/user/profile:
 *   get:
 *     summary: Get logged-in user profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched user profile
 *       401:
 *         description: Unauthorized – Token missing or invalid
 */
router.get("/profile", protect, getUserProfile);

/**
 * @swagger
 * /api/user/profile:
 *   put:
 *     summary: Update logged-in user profile
 *     tags: [User]
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
 *               phone:
 *                 type: string
 *               age:
 *                 type: number
 *               gender:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized – Token missing or invalid
 */
router.put("/profile", protect, updateUserProfile);

module.exports = router;