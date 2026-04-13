const Reservation = require("../models/Reservation");

// @desc   Create a new reservation (public)
// @route  POST /api/reservations
// @access Public
const createReservation = async (req, res) => {
  try {
    const { name, email, tableNumber, date, time, partySize, isBirthday } = req.body;

    if (!name || !email || !tableNumber || !date || !time) {
      return res.status(400).json({ message: "Please fill all required fields." });
    }

    // Check conflict: same table + date + time already booked
    const conflict = await Reservation.findOne({ tableNumber, date, time, status: "confirmed" });
    if (conflict) {
      return res.status(409).json({
        message: `Table ${tableNumber} is already reserved on ${date} at ${time}. Please choose a different table or time.`,
        conflict: true,
      });
    }

    const reservation = await Reservation.create({ 
      name, 
      email, 
      tableNumber, 
      date, 
      time, 
      partySize, 
      isBirthday: isBirthday === true || isBirthday === 'true' 
    });
    res.status(201).json(reservation);
  } catch (error) {
    // Duplicate key (race condition safety net)
    if (error.code === 11000) {
      return res.status(409).json({
        message: "That seat is already taken. Please pick another table or time.",
        conflict: true,
      });
    }
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get all reservations (admin)
// @route  GET /api/reservations
// @access Admin only
const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ date: 1, time: 1 });
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Cancel a reservation (admin)
// @route  PUT /api/reservations/:id/cancel
// @access Admin only
const cancelReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { status: "cancelled" },
      { new: true }
    );
    if (!reservation) return res.status(404).json({ message: "Reservation not found." });
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Check if a slot is available (public)
// @route  GET /api/reservations/check?tableNumber=T1&date=2026-04-20&time=19:00
// @access Public
const checkAvailability = async (req, res) => {
  try {
    const { tableNumber, date, time } = req.query;
    if (!tableNumber || !date || !time) {
      return res.status(400).json({ message: "tableNumber, date and time are required." });
    }
    const conflict = await Reservation.findOne({ tableNumber, date, time, status: "confirmed" });
    res.json({ available: !conflict });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createReservation, getAllReservations, cancelReservation, checkAvailability };
