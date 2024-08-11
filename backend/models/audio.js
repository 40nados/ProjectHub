const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const audioSchema = new mongoose.Schema(
  {
    title: { type: String },
    userId: { type: String, default: uuidv4 },
    url: { type: String, required: true }, //Será pego no S3
  },
  { timestamp: true }
);

let Audio = mongoose.model("Audio", audioSchema);
module.exports = Audio;
