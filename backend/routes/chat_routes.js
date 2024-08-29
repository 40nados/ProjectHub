const express = require("express");
const routes = express.Router();
const { chat_controller } = require("../config/database");

//Middlewares
const authenticateJWT = require("../middlewares/auth");
routes.use(authenticateJWT);

//ROUTES
routes.get("/chat", async (req, res) => {
  const result = await chat_controller.listAllChats();
  res.send(result);
});

routes.get("/chat/:id", async (req, res) => {
  const result = await chat_controller.getChatById(req.params.id);
  if (result) {
    if (result.error) {
      res.status(result.status).json(result);
    }
    res.send(result);
  } else res.status(404).json({error: "User not found"});
});

routes.post("/chat", async (req, res) => {
  const result = await chat_controller.createChat(req.body);
  if (result.error) res.status(result.status).json(result);
  else res.send(result);
});

routes.post("/chat/join/:id", async (req, res) => {
  const result = await chat_controller.joinUser(req.params.id, req.body.userId);
  if (result.error) res.status(result.status).json(result);
  else res.send(result);
});

routes.patch("/chat/:id", async (req, res) => {
  const result = await chat_controller.editName(req.params.id, req.body);
  if (result.error) res.status(result.status).json(result);
  else res.send(result);
});

routes.delete("/chat/join/:id", async (req, res) => {
  const result = await chat_controller.removeUserFromChat(
    req.params.id,
    req.body.userId
  );
  if (result) {
    if (result.error) {
      res.status(result.status).json(result.error);
    }
    res.status(200).json({ message: "User removed from Chat succesfully!" });
  } else res.status(404).json({error: "User not found"});
});

routes.delete("/chat/:id", async (req, res) => {
  const result = await chat_controller.deleteChat(req.params.id);
  if (result) {
    if (result.error) {
      res.status(result.status).json(result);
    }
    res.status(200).json(result);
  } else res.status(404).json({error: "User not found"});
});

module.exports = routes;
