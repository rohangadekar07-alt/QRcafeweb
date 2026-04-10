const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    tableId: { type: String, required: true }, // T1-T10
    items: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true, min: 1 },
      },
    ],
    status: {
      type: String,
      enum: ["pending", "preparing", "completed", "cancelled"],
      default: "pending",
    },
    totalAmount: { type: Number, required: true },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
