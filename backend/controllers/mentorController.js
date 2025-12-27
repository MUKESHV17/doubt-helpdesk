const Doubt = require("../models/Doubt");
const Message = require("../models/Message");

// Get all OPEN doubts
exports.getOpenDoubts = async (req, res) => {
  try {
    const doubts = await Doubt.find({ status: "OPEN" }).populate(
      "studentId",
      "name email"
    );
    res.json(doubts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mentor replies to doubt
exports.replyToDoubt = async (req, res) => {
  try {
    const { message } = req.body;
    const { doubtId } = req.params;

    const reply = await Message.create({
      doubtId,
      senderRole: "mentor",
      message,
      verified: true
    });

    await Doubt.findByIdAndUpdate(doubtId, {
      status: "ANSWERED"
    });

    // 🔥 emit reply to that doubt room
    const io = req.app.get("io");
    io.to(doubtId).emit("mentor_reply", reply);

    res.json({ message: "Reply sent successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Close doubt
exports.closeDoubt = async (req, res) => {
  try {
    const { doubtId } = req.params;

    await Doubt.findByIdAndUpdate(doubtId, {
      status: "CLOSED"
    });

    res.json({ message: "Doubt closed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
