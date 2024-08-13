const express = require("express");
const routes = express.Router();
const bodyParser = require("body-parser");
const { message_controller } = require("../database");

//BODY PARSER
routes.use(bodyParser.urlencoded({ extended: false }));
routes.use(bodyParser.json());

//ROUTES

routes.post("/message", async (req, res) => {
  const allMessages = await message_controller.listAllMessages();
  res.send({ list: allMessages });
});

module.exports = routes;
