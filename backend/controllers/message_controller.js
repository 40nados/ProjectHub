const Message = require("../models/message");
const Chat = require("../models/chat");
const mongoose = require('mongoose');
const { DeletePhoto } = require("../controllers/photo_controller")

async function getMessages(chatId, limit, offset) {
    try{
        const result = await Message.find({chat: chatId}).skip(offset).limit(limit)
        .sort([["createdAt", -1]]).exec();
        return result;
    }catch(error){
        console.log('error', err);
        return { error: "Server Internal Error", status: 500 };
    }
}

async function createMessage(chatId, body) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { sender, type, content, url } = body;
        let message = new Message({ sender, type, content, url, chat: chatId });
        const savedMessage = await message.save({session});

        const updatedChat = await Chat.updateMany(
            { _id: { $in: chatId } },
            { $push: { messages: savedMessage._id } },
            { session }
        );

        await session.commitTransaction();
        return { message: savedMessage, chat: updatedChat };

    } catch (err) {
        console.log('error', err);
        return { error: "Server Internal Error", status: 500 };
    }finally{
        session.endSession();
    }
}

async function editMessage(messageId, body) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try{
        const { content } = body;
        const result = await Message.updateOne(
            { _id: messageId, type: 'text' },
            { $set: { content: content } } 
        );
        return result;
    }catch(error){
        console.log('error', err);
        return { error: "Server Internal Error", status: 500 };
    }finally{

    }
}

async function deleteMessage(messageId) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const result = await Message.findById(messageId).select('chat').exec();
        await Message.findByIdAndDelete(messageId);

        const updatedChat = await Chat.updateMany(
            { _id: result.chat },
            { $pull: { messages: messageId } },
            { session }
        );

        // Comitar a transação
        await session.commitTransaction();
        return { chat: updatedChat };
    } catch (err) {
        console.log('error', err);
        return { error: "Server Internal Error", status: 500 };
    }
}

module.exports = { getMessages, createMessage, editMessage, deleteMessage }