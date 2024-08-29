const Message = require("../models/message");
const Chat = require("../models/chat");
const mongoose = require('mongoose');
const { s3Client } = require("../config/awsS3Client");
const { DeleteObjectCommand } = require("@aws-sdk/client-s3");

async function getMessages(chatId, limit, offset) {
    try {
        const result = await Message.find({ chat: chatId }).skip(offset).limit(limit)
            .sort([["createdAt", -1]]).exec();
        return result;
    } catch (error) {
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
        const savedMessage = await message.save({ session });

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
    } finally {
        session.endSession();
    }
}

async function editMessage(messageId, body) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { content, url } = body;
        const message = await Message.findById(messageId);
        const oldImageKey = message.url.split(".com/")[1];
        message.content = content;
        message.url = url;

        const deleteParams = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: oldImageKey,
        };
        await s3Client.send(new DeleteObjectCommand(deleteParams));

        await message.save();

        return message;
    } catch (error) {
        console.log('error', err);
        return { error: "Server Internal Error", status: 500 };
    } finally {

    }
}

async function deleteMessage(messageId) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const message = await Message.findById(messageId).select('chat url').exec();
        if (!message) {
            throw new Error("Não há mensagens com esse id");
        }
        await Message.findByIdAndDelete(messageId);

        const updatedChat = await Chat.updateMany(
            { _id: message.chat },
            { $pull: { messages: messageId } },
            { session }
        );

        if (message.url) {
            const key = message.url.split(".com/")[1];
            const deleteParams = {
                Bucket: process.env.S3_BUCKET_NAME,
                Key: key,
            };
            await s3Client.send(new DeleteObjectCommand(deleteParams));
        }

        // Comitar a transação
        await session.commitTransaction();
        return { chat: updatedChat };
    } catch (err) {
        console.log('error', err);
        return { error: "Server Internal Error", status: 500 };
    }
}

module.exports = { getMessages, createMessage, editMessage, deleteMessage }