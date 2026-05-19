const Order = require("../models/Order");
const Product = require("../models/Product");

const addOrderItems = async (req, res) => {
  const { orderItems, total } = req.body;

  if (orderItems && orderItems.length === 0) {
    return res.status(400).json({ message: "No order items" });
  }

  const order = new Order({
    user: req.user._id,
    userName: req.user.name,
    userEmail: req.user.email,
    items: orderItems,
    total: total,
  });

  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
};

const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({
    createdAt: -1,
  });
  res.status(200).json(orders);
};

const updateOrderStatus = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.status = req.body.status;
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404).json({ message: "Order not found" });
  }
};

module.exports = { addOrderItems, getMyOrders, updateOrderStatus };
