const express = require("express");
const routes = express.Router();
const bodyParser = require("body-parser");
const { message_controller } = require("../config/database");
const { imageUpload } = require("../middlewares/imageUpload");
const { audioUpload } = require("../middlewares/audioUpload");

//Middlewares
const authenticateJWT = require("../middlewares/auth");
routes.use(authenticateJWT);

//ROUTES

const selectUpload = (req, res, next) => {
  if (req.headers.type == 'image') {
    imageUpload.single("imageUrl")(req, res, next);
  }
  else if (req.headers.type == 'audio') {
    audioUpload.single("audioUrl")(req, res, next);
  }
  else {
    next()
  }
}

routes.get("/message/:chatId", async (req, res) => {
  const { limit, page } = req.query;
  const offset = (page - 1) * limit; //page vai de 1 pra cima;
  const result = await message_controller.getMessages(
    req.params.chatId,
    limit,
    offset
  );
  if (result.error) res.status(result.status).json(result);
  else res.send(result);
});

routes.post("/message/:chatId", selectUpload, async (req, res) => {
  req.body.url = req.file?.location || '';
  req.body.type = req.headers.type || '';
  const result = await message_controller.createMessage(
    req.params.chatId,
    req.body
  );
  if (result.error) {
    res.status(result.status).json(result);
  }
  else {
    res.send(result);
  }
});

routes.put("/message/:messageId", selectUpload, async (req, res) => {
  req.body.url = req.file?.location || '';
  req.body.type = req.headers.type || '';
  const result = await message_controller.editMessage(
    req.params.messageId,
    req.body
  );
  if (result.error) res.status(result.status).json(result);
  else res.send(result);
});

routes.delete("/message/:messageId", async (req, res) => {
  const result = await message_controller.deleteMessage(req.params.messageId);
  if (result.error) res.status(result.status).json(result);
  else res.send(result);
});

module.exports = routes;
