const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const user = new mongoose.Schema({
    _id: { type: String, default: uuidv4 },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    user_photo: { type: String },
    language: { type: String, default: 'pt' },
    description: { type: String },
    // chats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chat' }]
});

let User = mongoose.model("User", user);
module.exports = User;