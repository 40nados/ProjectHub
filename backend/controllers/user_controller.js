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

async function createUser({ username, password, email, user_photo, language, description, color }) {
    try {
        let newUser = new User({
            username,
            password,
            email,
            user_photo,
            language,
            description,
            color,
        });
        await newUser.save();
        return newUser;
    } catch (err) {
        console.log('error', err);
        if (err.code == 11000) {
            return { error: `${Object.keys(err.keyValue)[0]} alredy exist`, status: 500 };
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
        color = null,
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
        if (color !== null) currentUser.color = color;

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

// ---- Implementndo função de seguidores

//Seguir alguém
async function followUser(req, res) {
    const { id } = req.params; // ID da pessoa a ser seguida
    const reqUser = req.body.userId; // ID do usuário que está seguindo
    //console.log(`reqUser: ${reqUser}, type: ${typeof reqUser}`);
    //console.log(`id: ${id}, type: ${typeof id}`);

    try {
        // Verificações básicas para evitar erros internos como seguir a si mesmo ou seguir alguém que nem existe
        if (reqUser === id) {
            return res.status(400).json({ error: 'You cannot follow yourself.' });
        }

        // Verificando se o usuário existe
        const userFollowed = await User.findById(id);
        if (!userFollowed) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // Adicionando o ID da pessoa que está sendo seguida no array 'following' do usuário
        await User.findByIdAndUpdate(reqUser, { $addToSet: { following: id } }); //addToSet adiciona um dado no mongo

        // Adicionando o ID do usuário no array 'followers' da pessoa que está sendo seguida
        await User.findByIdAndUpdate(id, { $addToSet: { followers: reqUser } });

        res.status(200).json({ message: `Now you are following ${userFollowed.username}.` }); //Mensagem personalizada, bom para usar no frontend no futuro
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error following user.' });
    }
}

//Deixar de Seguir álguem
async function unfollowUser(req, res) {
    const { id } = req.params; // ID da pessoa a ser deseguida (isso existe? kkkk fds)
    const reqUser = req.body.userId; // ID do usuário que vai deixar de seguir

    try {
        //Fazendo verificações básicas primeiramente, como deixar de seguir a si mesmo (?) ou deixar dew seguir álguem que não existe
        if (reqUser === id) {
            return res.status(400).json({ error: 'You cant follow youserf.' });
        }

        userFollowed = await User.findById(id);
        if (!userFollowed) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // Adicionar o ID da pessoa que está sendo seguida no array 'following' do usuário
        await User.findByIdAndUpdate(reqUser, { $pull: { following: id } }); //Pull tira

        // Adicionar o ID do usuário no array 'followers' da pessoa que está sendo seguida
        await User.findByIdAndUpdate(id, { $pull: { followers: reqUser } });

        res.status(200).json({ message: `You have unfollowed ${userFollowed.username}.` });
    } catch (error) {
        res.status(500).json({ error: 'Error to unfollowing user.' });
    }
}

//Ver quem tal pessoa está seguindo
async function getFollowing(req, res) {
    const reqUser = req.params.id;

    try {
        if (!reqUser) {
            return res.status(400).json({ error: 'User ID is required.' });
        }

        const user = await User.findById(reqUser).populate('following', 'username user_photo'); // Populando apenas username e user_photo, a principio será so esses, ao ver que tal pessoa ta seguindo aparece a foto de cada um, assim como seus respectivos nomes
        if (!user) {
            //console.log(reqUser);
            return res.status(404).json({ error: 'User not found.' });
        }

        res.status(200).json({ following: user.following });
    } catch (error) {
        res.status(500).json({ error: 'Error to get the follwoings.' });
    }
}

//Ver quem está seguindo tal pessoa
async function getFollowers(req, res) {
    const reqUser = req.params.id;

    try {
        const user = await User.findById(reqUser).populate('followers', 'username user_photo'); // Populando apenas username e user_photo novamente
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        res.status(200).json({ followers: user.followers });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching followers.' });
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
    followUser,
    unfollowUser,
    getFollowing,
    getFollowers,
};
