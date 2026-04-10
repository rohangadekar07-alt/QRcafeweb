const Table = require("../models/Table");
const QRCode = require("qrcode");

// @desc    Get all tables
// @route   GET /api/tables
// @access  Private (Admin)
const getTables = async (req, res) => {
  try {
    const tables = await Table.find({});
    res.json(tables);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Generate 10 tables (T1-T10) & QR codes
// @route   POST /api/tables
// @access  Private (Admin)
const generateTables = async (req, res) => {
  try {
    const tablePromises = [];
    const baseUrl = process.env.CLIENT_URL || "http://localhost:3000";

    for (let i = 1; i <= 10; i++) {
      const tableId = `T${i}`;
      const url = `${baseUrl}?table=${tableId}`;
      const qrCodeUrl = await QRCode.toDataURL(url);

      tablePromises.push(
        Table.findOneAndUpdate(
          { tableId },
          { tableId, qrCodeUrl },
          { upsert: true, new: true } // Update if exists, or create new
        )
      );
    }

    const tables = await Promise.all(tablePromises);
    res.status(201).json({ message: "Tables and QR codes generated", tables });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getTables, generateTables };
