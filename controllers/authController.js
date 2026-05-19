const User = require("../models/User");
const generateToken = require("../utils/generateToken");

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    console.log("HIT!");

    if (!user) {
      return res.status(404).json({ message: "User no longer exists." });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server authentication error." });
  }
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({ name, email, password });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};

const authUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      userCart: user.userCart,
      token: generateToken(user._id, user.role),
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};

const updateCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.userCart = req.body.cartItems;
      const updatedUser = await user.save();
      res.json(updatedUser.userCart);
    }
  } catch (error) {
    res.status(500).json({ message: "Cart update failed" });
  }
};

const toggleFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { productId } = req.body;

    const index = user.favorite.indexOf(productId);

    if (index > -1) {
      user.favorite.splice(index, 1);
    } else {
      user.favorite.push(productId);
    }

    await user.save();
    res.json(user.favorite);
  } catch (error) {
    res.status(500).json({ message: "Favorite toggle failed" });
  }
};

module.exports = { getMe, registerUser, authUser, updateCart, toggleFavorite };
