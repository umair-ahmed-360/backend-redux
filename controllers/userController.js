const User = require("../models/User");

const syncCart = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: { userCart: req.body.cartItems || [] } },
      { new: true, runValidators: true },
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Cart updated successfully:", updatedUser.userCart);
    res.json({
      message: "Cart synced successfully",
      cart: updatedUser.userCart,
    });
  } catch (error) {
    console.error("Cart Sync Error:", error.message);
    res.status(500).json({ message: "Server error during cart sync" });
  }
};

const syncFavorite = async (req, res) => {
  try {
    const favoriteData = req.body.favorite || [];

    const cleanedFavorites = favoriteData.map(item => 
      typeof item === "object" && item !== null ? item._id : item
    );
    
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: { favorite: req.body.favorite || [] } },
      { new: true, runValidators: true },
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "Favorite synced successfully",
      favorite: updatedUser.favorite,
    });
  } catch (error) {
    console.error("Favorite Sync Error:", error.message);
    res.status(500).json({ message: "Server error during favorite sync" });
  }
};

module.exports = { syncCart, syncFavorite };
