const Doubt = require("../models/Doubt");

// Student creates a doubt
exports.createDoubt = async (req, res) => {
  try {
    const { title, description } = req.body;

    const doubt = await Doubt.create({
      studentId: req.user.id,
      title,
      description
    });

    // 🔥 emit socket event
    const io = req.app.get("io");
    io.emit("new_doubt", doubt);

    res.status(201).json({
      message: "Doubt created successfully",
      doubt
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Student gets own doubts
exports.getMyDoubts = async (req, res) => {
  try {
    const doubts = await Doubt.find({ studentId: req.user.id });
    res.json(doubts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
