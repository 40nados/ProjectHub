const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema(
  {
    title: { type: String },
    url: { type: String, required: true }, //Será pego no S3
  },
  { timestamp: true }
);

let Photo = mongoose.model("Photo", photoSchema);
module.exports = Photo;
