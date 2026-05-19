const Product = require("../models/Product");

const getProducts = async (req, res) => {
  try {
    const product = await Product.find({});
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const createProduct = async (req, res) => {
  const { name, price, description, category, countInStock, details } =
    req.body;

  const product = new Product({
    name,
    price,
    user: req.user._id,
    category,
    countInStock,
    details,
    description,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
};

module.exports = { getProducts, createProduct };
