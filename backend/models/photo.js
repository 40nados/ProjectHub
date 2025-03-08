const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const photoSchema = new mongoose.Schema(
    {
        title: { type: String },
        userId: { type: String, default: uuidv4 },
        url: { type: String, required: true }, //Será pego no S3
    },
    { timestamps: true }
);

let Photo = mongoose.model('Photo', photoSchema);
module.exports = Photo;
