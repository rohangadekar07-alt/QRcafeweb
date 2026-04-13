const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    tableNumber: { type: String, required: true }, // e.g. "T1" – "T10"
    date: { type: String, required: true },        // "YYYY-MM-DD"
    time: { type: String, required: true },        // "HH:MM" 24h
    partySize: { type: Number, default: 2 },
    isBirthday: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["confirmed", "cancelled"],
      default: "confirmed",
    },
  },
  { timestamps: true }
);

// Compound unique index: one booking per table + date + time slot
reservationSchema.index(
  { tableNumber: 1, date: 1, time: 1 },
  { unique: true }
);

module.exports = mongoose.model("Reservation", reservationSchema);
