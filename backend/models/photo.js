const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema({
  image: { type: String, required: true },
  title: { type: String },
  url: { type: String, required: true }, //Será pego no S3
  timestamps: { type: Date, required: true },
});

let Photo = mongoose.model("Photo", photoSchema);
module.exports = Photo;
