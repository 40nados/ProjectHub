const User = require('../models/user');
const { s3Client } = require('../config/awsS3Client');
const { DeleteObjectCommand } = require('@aws-sdk/client-s3');

async function listAllUsers() {
    return await User.find();
}

async function getUserById(id) {
    try {
        //select com "-" exclui um atributo;
        //sect sem "-" adiciona apenas os que forem colocados no select
        return await User.findById(id).select('-password').populate('chats').exec();
    } catch (err) {
        console.log('error', err);
        return { error: 'Server Internal Error', status: 500 };
    }
}

async function getPasswordByUsername(username) {
    try {
        //select com "-" exclui um atributo;
        //sect sem "-" adiciona apenas os que forem colocados no select
        return await User.findOne({ username }).select('username password').exec();
    } catch (err) {
        console.log('error', err);
        return { error: 'Server Internal Error', status: 500 };
    }
}

async function getPasswordByEmail(email) {
    try {
        //select com "-" exclui um atributo;
        //sect sem "-" adiciona apenas os que forem colocados no select
        return await User.findOne({ email }).select('email password').exec();
    } catch (err) {
        console.log('error', err);
        return { error: 'Server Internal Error', status: 500 };
    }
}

async function getUserByEmail(email) {
    try {
        // Encontra o usuário pelo e-mail, exclui a senha dos resultados
        return await User.findOne({ email }).select('-password').exec();
    } catch (err) {
        console.log('error', err);
        return { error: 'Server Internal Error', status: 500 };
    }
}

async function createUser({ username, password, email, user_photo, language, description }) {
    try {
        let newUser = new User({ username, password, email, user_photo, language, description });
        await newUser.save();
        return newUser;
    } catch (err) {
        console.log('error', err);
        if (err.code == 11000) {
            return { error: `O ${Object.keys(err.keyValue)[0]} ja existe`, status: 500 };
        }
        return { error: 'Server Internal Error', status: 500 };
    }
}

async function patchUser(
    id,
    {
        username = null,
        password = null,
        email = null,
        user_photo = null,
        language = null,
        description = null,
    }
) {
    try {
        let currentUser = await User.findById(id);
        let oldImageKey = currentUser.user_photo;

        if (oldImageKey) {
            const deleteParams = {
                Bucket: process.env.S3_BUCKET_NAME,
                Key: oldImageKey,
            };
            await s3Client.send(new DeleteObjectCommand(deleteParams));
        }

        if (username !== null) currentUser.username = username;
        if (password !== null) currentUser.password = password;
        if (email !== null) {
            currentUser.email = email;
            currentUser.emailVerified = false;
        }
        if (user_photo !== null) currentUser.user_photo = user_photo;
        if (language !== null) currentUser.language = language;
        if (description !== null) currentUser.description = description;

        currentUser.save();
        return currentUser;
    } catch (err) {
        console.log('erro', err);
        return { error: 'Server Internal Error', status: 404 };
    }
}

async function deleteUser(id) {
    try {
        let deletedUser = await User.findByIdAndDelete(id);

        if (deletedUser.user_photo) {
            const key = deletedUser.user_photo.split('.com/')[1];

            const deleteParams = {
                Bucket: process.env.S3_BUCKET_NAME,
                Key: key,
            };

            await s3Client.send(new DeleteObjectCommand(deleteParams));
        }

        return deletedUser;
    } catch (err) {
        console.log('erro', err);
        return { error: 'Server Internal Error', status: 500 };
    }
}

module.exports = {
    listAllUsers,
    getUserById,
    getPasswordByUsername,
    getPasswordByEmail,
    getUserByEmail,
    createUser,
    patchUser,
    deleteUser,
};
