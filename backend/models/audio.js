const mongoose = require("mongoose");

const audioSchema = new mongoose.Schema(
  {
    title: { type: String },
    url: { type: String, required: true }, //Será pego no S3
  },
  { timestamp: true }
);

let Audio = mongoose.model("Audio", audioSchema);
module.exports = Audio;
