const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    doubtId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doubt",
      required: true
    },
    senderRole: {
      type: String,
      enum: ["student", "mentor", "ai"],
      required: true
    },
    message: {
      type: String,
      required: true
    },
    verified: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
