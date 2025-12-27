const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  createDoubt,
  getMyDoubts
} = require("../controllers/doubtController");

// Student routes
router.post("/", authMiddleware, createDoubt);
router.get("/my", authMiddleware, getMyDoubts);

module.exports = router;
