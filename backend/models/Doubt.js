const mongoose = require("mongoose");

const doubtSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ["OPEN", "ANSWERED", "CLOSED"],
      default: "OPEN"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Doubt", doubtSchema);
