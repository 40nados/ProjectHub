const express = require("express");
const routes = express.Router();
const bodyParser = require("body-parser");
const { user_controller } = require("../database");

//BODY PARSER
routes.use(bodyParser.urlencoded({ extended: false }));
routes.use(bodyParser.json());

//ROUTES

routes.get('/user', async (req, res) => {
    const allUsers = await user_controller.listAllUsers();
    res.send({list: allUsers});
});



module.exports = routes;