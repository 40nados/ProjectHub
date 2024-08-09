const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const message = new mongoose.Schema(
  {
    _id: { type: String, default: uuidv4 },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat", required: true },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: { type: String, enum: ["text", "image", "audio"], required: true },
    content: { type: String, required: true },
  },
  { timestamp: true }
);

let Message = mongoose.model("Message", message);
module.exports = Message;
