const Message = require("../models/message");

async function getMessage(id) {
    return await Message.findById(id)
}

async function createMessage({ chat, sender, type, content, timestamp }) {
    let newUser = new Message({ chat, sender, type, content, timestamp });
    try {
        await newUser.save();
        return { "message": newUser };
    } catch (err) {
        return { "message": err };
    }
}

async function editMessage({ chat, sender, type, content, timestamp }) {

}

async function deleteMessage(id) {
    try {
        await Message.findByIdAndRemove(id)
        return { "message": "Person deleted" };
    } catch (err) {
        return { "message": err };
    }
}

module.exports = { getMessage, createMessage, editMessage, deleteMessage }