const express = require("express");
const routes = express.Router();
const bodyParser = require("body-parser");
const { message_controller } = require("../config/database");

//BODY PARSER
routes.use(bodyParser.urlencoded({ extended: false }));
routes.use(bodyParser.json());

//ROUTES

routes.get("/message/:chatId", async (req, res) => {
  const { limit, page } = req.query;
  const offset = (page - 1) * limit; //page vai de 1 pra cima;
  const result = await message_controller.getMessages(
    req.params.chatId,
    limit,
    offset
  );
  if (result.error) res.status(result.status).json(result.error);
  else res.send(result);
});

routes.post("/message/:chatId", async (req, res) => {
  if (req.body.type == "text") {
    const result = await message_controller.createMessage(
      req.params.chatId,
      req.body
    );
    if (result.error) res.status(result.status).json(result.error);
    else res.send(result);
  } else if (req.body.type == "image") {
    // Manupular o s3
  } else if (req.body.type == "audio") {
    // Manupular o s3
  }
});

routes.put("/message/:messageId", async (req, res) => {
  const result = await message_controller.editMessage(
    req.params.messageId,
    req.body
  );
  if (result.error) res.status(result.status).json(result.error);
  else res.send(result);
});

routes.delete("/message/:messageId", async (req, res) => {
  const result = await message_controller.deleteMessage(req.params.messageId);
  if (result.error) res.status(result.status).json(result.error);
  else res.send(result);
});

module.exports = routes;
