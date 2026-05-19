const express = require("express");
const router = express.Router();
const { registerUser, authUser } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", authUser);

router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});

module.exports = router;
