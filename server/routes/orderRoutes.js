const express = require("express");
const router = express.Router();
const { createOrder, getOrders, updateOrderStatus } = require("../controllers/orderController");
const { protect } = require("../middlewares/authMiddleware");
const { authorizeRoles } = require("../middlewares/roleMiddleware");

router
  .route("/")
  .post(createOrder)
  .get(protect, authorizeRoles("admin", "chef"), getOrders);

router
  .route("/:id/status")
  .put(protect, authorizeRoles("chef"), updateOrderStatus);

module.exports = router;
