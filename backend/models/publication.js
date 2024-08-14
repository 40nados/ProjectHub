const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const publicationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    comments: { type: Array },
    likes: { type: Array },
    technologies: { type: Array },
    url: { type: String, required: true }, //Será pego no S3
  },
  { timestamp: true }
);

let Publication = mongoose.model("Publication", publicationSchema);
module.exports = Publication;
