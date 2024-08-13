const Chat = require("../models/chat");
const User = require("../models/user");
const mongoose = require('mongoose');

async function listAllChats() {
    return await Chat.find()
}

async function getChatById(id) {
    try {
        //Para especificar quais atributos de user ele cascatearia: populate('users', 'name email').exec()
        return await Chat.findById(id).populate('users').exec();
    }
    catch (err) {
        console.log('error', err);
        return { error: "Server Internal Error", status: 500 };
    }
}

async function createChat({ name, userIds }) {
    const session = await mongoose.startSession();
    session.startTransaction();
    //transaction tentará efetuar todas as operações de BD, se uma der errado, todas as outras são abortadas tb;
    //Evita Lixo no BD, igual como aconteceu de ter no S3, mas não no mongo.

    try {
        // Verificar se ambos os usuários existem
        const users = await User.find({ _id: { $in: userIds } }).session(session);
        if (users.length !== userIds.length) {
            throw new Error('Um ou mais usuários não foram encontrados');
        }

        // Criar um novo chat
        const newChat = new Chat({
            name: name,
            users: userIds
        });
        const savedChat = await newChat.save({ session });

        // Adicionar o chat ao array de chats de cada usuário
        await User.updateMany(
            { _id: { $in: userIds } },
            { $push: { chats: savedChat._id } },
            { session }
        );

        // Comitar a transação
        await session.commitTransaction();
        return savedChat;

    } catch (error) {
        await session.abortTransaction();
        console.error('Erro ao criar o chat:', error);
        return { message: 'Erro ao criar o chat:', 'error': error }
    } finally {
        session.endSession();
    }
}

async function joinUser(id, userId) {

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Atualizar Chat
        const updatedChat = await Chat.updateOne(
            { _id: id },
            { $addToSet: { users: userId } },
            { session }
        );

        // Atualizar Usuário
        const updateduser = await User.updateOne(
            { _id: userId },
            { $addToSet: { chats: id } },
            { session }
        );

        // Comitar a transação
        await session.commitTransaction();
        return { chat: updatedChat, user: updateduser };

    } catch (error) {
        await session.abortTransaction();
        console.error('Erro ao atualizar o chat:', error);
        return { message: 'Erro ao atualizar o chat:', 'error': error }
    } finally {
        session.endSession();
    }
}

async function editName(id, { name }) {
    try {
        let currentChat = await Chat.findByIdAndUpdate(id, { name: name }, { new: true });
        return currentChat ? currentChat : { "error": "User not found", "status": 404 };
    } catch (err) {
        console.log('erro', err);
        return { error: "Server Internal Error", status: 404 };
    }
}

async function removeUserFromChat(id, userId) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Remover o chat da lista de chats do usuario
        const updateduser = await User.updateOne(
            { _id: userId, chats: id }, //encontra o usuario e o chat
            { $pull: { chats: id } }, //remove o chat
            { session }
        );

        // Remover o usuario da lista de usuarios do chat
        const updatedChat = await Chat.updateOne(
            { _id: id, users: userId },
            { $pull: { users: userId } },
            { session }
        )

        // Comitar a transação
        await session.commitTransaction();
        return { chat: updatedChat, user: updateduser };


    } catch (error) {
        console.log(error);
        return { message: 'Erro ao atualizar o chat:', 'error': error }
    } finally {
        session.endSession();
    }
}

async function deleteChat(id) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const result = await Chat.findById(id).select('users').exec();
        await Chat.findByIdAndDelete(id);


        const updatedusers = await User.updateMany(
            { _id: result.users },
            { $pull: { chats: id } },
            { session }
        );

        console.log(updatedusers)

        // Comitar a transação
        await session.commitTransaction();
        return { users: updatedusers };
    } catch (err) {
        console.log(err)
        return { "message": err };
    }
}

module.exports = { listAllChats, getChatById, joinUser, createChat, editName, removeUserFromChat, deleteChat }