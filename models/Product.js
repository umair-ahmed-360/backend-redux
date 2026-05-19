const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    category: { type: String, required: true },
    description: { type: String, required: true },
    countInStock: { type: Number, required: true, default: 0 },
    image: { type: String, default: "" },
    details: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Product", productSchema);
