const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const mentorMiddleware = require("../middleware/mentorMiddleware");

const {
  getOpenDoubts,
  replyToDoubt,
  closeDoubt
} = require("../controllers/mentorController");

router.get(
  "/doubts",
  authMiddleware,
  mentorMiddleware,
  getOpenDoubts
);

router.post(
  "/reply/:doubtId",
  authMiddleware,
  mentorMiddleware,
  replyToDoubt
);

router.patch(
  "/close/:doubtId",
  authMiddleware,
  mentorMiddleware,
  closeDoubt
);

module.exports = router;
