const express = require("express");
const router = express.Router();
const { getTables, generateTables } = require("../controllers/tableController");
const { protect } = require("../middlewares/authMiddleware");
const { authorizeRoles } = require("../middlewares/roleMiddleware");

router
  .route("/")
  .get(protect, authorizeRoles("admin"), getTables)
  .post(protect, authorizeRoles("admin"), generateTables);

module.exports = router;
