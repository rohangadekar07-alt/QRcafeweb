const express = require("express");
const router = express.Router();
const {
  createReservation,
  getAllReservations,
  cancelReservation,
  checkAvailability,
} = require("../controllers/reservationController");
const { protect } = require("../middlewares/authMiddleware");

// Public routes
router.post("/", createReservation);
router.get("/check", checkAvailability);

// Admin-protected routes
router.get("/", protect, getAllReservations);
router.put("/:id/cancel", protect, cancelReservation);

module.exports = router;
