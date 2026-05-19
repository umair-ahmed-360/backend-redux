const express = require("express");
const router = express.Router();
const {
  addOrderItems,
  getMyOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

router.route("/").post(protect, addOrderItems);
router.route("/myOrders").get(protect, getMyOrders);
router.route("/:id/status").put(protect, admin, updateOrderStatus);

module.exports = router;