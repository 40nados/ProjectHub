const User = require("../models/user");

async function listAllUsers() {
  return await User.find();
}

async function getUserById(id) {
  try {
    //select com "-" exclui um atributo;
    //sect sem "-" adiciona apenas os que forem colocados no select
    return await User.findById(id).select("-password").populate("chats").exec();
  } catch (err) {
    console.log("error", err);
    return { error: "Server Internal Error", status: 500 };
  }
}

async function getPasswordByUsername(username) {
  try {
    //select com "-" exclui um atributo;
    //sect sem "-" adiciona apenas os que forem colocados no select
    return await User.findOne({ username }).select("username password").exec();
  } catch (err) {
    console.log("error", err);
    return { error: "Server Internal Error", status: 500 };
  }
}

async function getPasswordByEmail(email) {
  try {
    //select com "-" exclui um atributo;
    //sect sem "-" adiciona apenas os que forem colocados no select
    return await User.findOne({ email }).select("email password").exec();
  } catch (err) {
    console.log("error", err);
    return { error: "Server Internal Error", status: 500 };
  }
}

async function createUser({
  username,
  password,
  email,
  user_photo,
  language,
  description,
}) {
  let newUser = new User({
    username,
    password,
    email,
    user_photo,
    language,
    description,
  });
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { error: "O e-mail já foi está registrado.", status: 400 };
    }

    await newUser.save();
    return newUser;
  } catch (err) {
    console.log("error", err);
    return { error: "Server Internal Error", status: 500 };
  }
}

async function putUser(
  id,
  { username, password, email, user_photo, language, description }
) {
  try {
    // Garantir que todos os campos necessários sejam fornecidos
    if (
      !username ||
      !password ||
      !email ||
      !user_photo ||
      !language ||
      !description
    ) {
      throw new Error(
        "Todos os campos são necessários para uma atualização completa."
      );
    }

    const updatedUser = {
      username,
      password,
      email,
      user_photo,
      language,
      description,
    };

    var currentUser = await User.findByIdAndUpdate(id, updatedUser, {
      new: true,
    });
    return currentUser ? currentUser : { error: "User not found", status: 404 };
  } catch (err) {
    console.log("erro", err);
    return { error: "Server Internal Error", status: 404 };
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
    const updateFields = {};
    if (username !== null) updateFields.username = username;
    if (password !== null) updateFields.password = password;
    if (email !== null) updateFields.email = email;
    if (user_photo !== null) updateFields.user_photo = user_photo;
    if (language !== null) updateFields.language = language;
    if (description !== null) updateFields.description = description;

    var currentUser = await User.findByIdAndUpdate(id, updateFields, {
      new: true,
    });
    return currentUser ? currentUser : { error: "User not found", status: 404 };
  } catch (err) {
    console.log("erro", err);
    return { error: "Server Internal Error", status: 404 };
  }
}

async function deleteUser(id) {
  try {
    return await User.findByIdAndDelete(id);
  } catch (err) {
    console.log("erro", err);
    return { error: "Server Internal Error", status: 500 };
  }
}

module.exports = {
  listAllUsers,
  getUserById,
  getPasswordByUsername,
  getPasswordByEmail,
  createUser,
  putUser,
  patchUser,
  deleteUser,
};
