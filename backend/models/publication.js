const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const publicationSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        /*userId: { type: String, default: uuidv4 },*/
        user: { type: String, ref: 'User' },
        description: { type: String },
        comments: { type: Array },
        likes: { type: Array },
        technologies: { type: [String] },
        project_link: { type: String, default: '' },
        url: { type: String, required: true }, //Será pego no S3
    },
    { timestamps: true }
);

let Publication = mongoose.model('Publication', publicationSchema);
module.exports = Publication;