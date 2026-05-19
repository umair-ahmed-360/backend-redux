const express = require("express");
const router = express.Router();

const { syncCart, syncFavorite } = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

router.post("/sync-cart", protect, syncCart);
router.post("/sync-favorite", protect, syncFavorite);

module.exports = router;
