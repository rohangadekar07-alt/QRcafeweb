const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema(
  {
    tableId: { type: String, required: true, unique: true }, // T1-T10
    qrCodeUrl: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Table", tableSchema);
