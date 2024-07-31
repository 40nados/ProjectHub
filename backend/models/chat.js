const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const chat = new mongoose.Schema({
    _id: { type: String, default: uuidv4 },
    name: { type: String, required: true },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], 
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }]
});

let Chat = mongoose.model("Chat", chat);
module.exports = Chat;