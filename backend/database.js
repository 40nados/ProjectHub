require("dotenv").config();
const mongoose = require("mongoose");
const chat_controller = require("./controllers/chat_controller");
const message_controller = require("./controllers/message_controller");
const user_controller = require("./controllers/user_controller");
const photo_controller = require("./controllers/photo_controller");
const audio_controller = require("./controllers/audio_controller");

//Database
async function connectToDatabase() {
  mongoose.connect(process.env.DATABASE_URL, {});
  const db = mongoose.connection; //Infos about mongoose connection
  db.on("error", (error) => console.error(error));
  db.once("open", () => console.log("Connected to the database. "));
}

//EXPORTS
module.exports = {
    connectToDatabase,
    chat_controller,
    message_controller,
    user_controller,
    photo_controller,
    audio_controller
}
