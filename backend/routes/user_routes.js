const express = require("express");
const routes = express.Router();
const { user_controller } = require("../database");

//ROUTES
routes.get("/user", async (req, res) => {
  const result = await user_controller.listAllUsers();
  res.send(result);
});

routes.get("/user/:id", async (req, res) => {
  const result = await user_controller.getUserById(req.params.id);
  if (result) {
    if (result.error) {
      res.status(result.status).json(result.error);
    }
    res.send(result);
  } else res.status(404).json("User not found");
});

routes.post("/user", async (req, res) => {
  const result = await user_controller.createUser(req.body);
  if (result.error) res.status(result.status).json(result.error);
  else res.send(result);
});

routes.put("/user/:id", async (req, res) => {
  const result = await user_controller.putUser(req.params.id, req.body);
  if (result.error) res.status(result.status).json(result.error);
  else res.send(result);
});

routes.patch("/user/:id", async (req, res) => {
  const result = await user_controller.patchUser(req.params.id, req.body);
  if (result.error) res.status(result.status).json(result.error);
  else res.send(result);
});

routes.delete("/user/:id", async (req, res) => {
  const result = await user_controller.deleteUser(req.params.id);
  if (result) {
    if (result.error) {
      res.status(result.status).json(result.error);
    }
    res.status(200).json({ message: "User Deleted Succesfully!" });
  } else res.status(404).json("User not found");
});

module.exports = routes;
