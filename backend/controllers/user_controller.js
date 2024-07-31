const User = require("../models/user");

async function getuser(id) {
    return await User.findById(id)
}

async function createUser({ username, password, email, user_photo, language, description }) {
    let newUser = new User({ username, password, email, user_photo, language, description });
    try {
        await newUser.save();
        return { "message": newUser };
    } catch (err) {
        return { "message": err };
    }
}

async function editUser({ username, password, email, user_photo, language, description }) {

}

async function deleteUser(id) {
    try {
        await User.findByIdAndRemove(id)
        return { "message": "Person deleted" };
    } catch (err) {
        return { "message": err };
    }
}

module.exports = { getuser, createUser, editUser, deleteUser }