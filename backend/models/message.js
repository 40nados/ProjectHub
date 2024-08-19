const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const message = new mongoose.Schema(
  {
    _id: { type: String, default: uuidv4 },
    chat: { type: String, ref: "Chat", required: true },
    sender: { type: String, ref: "User", required: true },
    type: { type: String, enum: ["text", "image", "audio"], required: true },
    content: { type: String, required: true },
    url: { type: String }
  },
  { timestamps: true }
);

let Message = mongoose.model("Message", message);
module.exports = Message;
