const express = require("express");
const router = express.Router();
const {
  getMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} = require("../controllers/menuController");
const { protect } = require("../middlewares/authMiddleware");
const { authorizeRoles } = require("../middlewares/roleMiddleware");

router
  .route("/")
  .get(getMenuItems)
  .post(protect, authorizeRoles("admin"), createMenuItem);

router
  .route("/:id")
  .put(protect, authorizeRoles("admin"), updateMenuItem)
  .delete(protect, authorizeRoles("admin"), deleteMenuItem);

module.exports = router;
