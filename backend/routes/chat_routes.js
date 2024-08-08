const express = require("express");
const routes = express.Router();
const bodyParser = require("body-parser");
const { chat_controller } = require("../database");

//BODY PARSER
routes.use(bodyParser.urlencoded({ extended: false }));
routes.use(bodyParser.json());

//ROUTES

routes.get('/chat', async (req, res) => {
    const allChats = await chat_controller.listAllChats();
    res.send({list: allChats});
});



module.exports = routes;