const Chat = require("../models/message");

async function listAllChats(){
    return await Chat.find()
}

async function getMessage(id) {
    return await Chat.findById(id)
}

async function createChat({ name, users, messages }) {
    let newUser = new Chat({ name, users, messages });
    try {
        await newUser.save();
        return { "message": newUser };
    } catch (err) {
        return { "message": err };
    }
}

async function editChat({ name, users, messages }) {

}

async function deleteChat(id) {
    try {
        await Chat.findByIdAndRemove(id)
        return { "message": "Person deleted" };
    } catch (err) {
        return { "message": err };
    }
}

module.exports = { listAllChats, getMessage, createChat, editChat, deleteChat }