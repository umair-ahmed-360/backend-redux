const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    items: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        image: { type: String },
        selectedDetails: { type: Map, of: String },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],
    total: { type: Number, required: true },
    status: {
      type: String,
      required: true,
      default: "Processing",
      enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
    },
    expectedDelivery: { type: Date },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Order", orderSchema);
