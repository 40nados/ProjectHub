require('dotenv').config();
const mongoose = require("mongoose");

//Database
async function connectToDatabase() {
    mongoose.connect(process.env.DATABASE_URL, {});
    const db = mongoose.connection; //Infos about mongoose connection
    db.on("error", (error) => console.error(error));
    db.once("open", () => console.log("Connected to the database. "));
}

//EXPORTS
module.exports = {
    connectToDatabase: connectToDatabase,
}