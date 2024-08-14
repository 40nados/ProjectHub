const mongoose = require("mongoose");

const publicationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    comments: { type: Array },
    likes: { type: Array },
    technologies: { type: Array },
    url: { type: String, required: true }, //Será pego no S3
  },
  { timestamp: true }
);

let Publication = mongoose.model("Publication", publicationSchema);
module.exports = Publication;
