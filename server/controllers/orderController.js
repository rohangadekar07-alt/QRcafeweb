const Order = require("../models/Order");
const io = require("../sockets/socket");

// @desc    Create a new order
// @route   POST /api/orders
// @access  Public (Customer)
const createOrder = async (req, res) => {
  try {
    const { tableId, items, totalAmount, paymentStatus } = req.body;
    
    if (!tableId || !items || items.length === 0) {
      return res.status(400).json({ message: "Table ID and items are required" });
    }

    const order = new Order({
      tableId,
      items,
      totalAmount,
      paymentStatus: paymentStatus || "paid",
      status: "pending",
    });

    const createdOrder = await order.save();
    
    // Emit new order to Admin & Chef
    io.getIo().emit("new_order", createdOrder);

    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all orders (with optional filters)
// @route   GET /api/orders
// @access  Private (Admin & Chef)
const getOrders = async (req, res) => {
  try {
    const filters = {};
    if (req.query.status) filters.status = req.query.status;
    if (req.query.tableId) filters.tableId = req.query.tableId;

    const orders = await Order.find(filters).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private (Chef)
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (order) {
      order.status = status;
      const updatedOrder = await order.save();

      // Emit status update to Admin
      if (status === "completed") {
        io.getIo().emit("order_completed", updatedOrder);
      } else {
        io.getIo().emit("order_updated", updatedOrder);
      }

      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createOrder, getOrders, updateOrderStatus };
