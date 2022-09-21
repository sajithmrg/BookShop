const routes = require("express").Router();
const userController = require("../../controllers/user.controller");

routes.post("/createUser", userController.createUser);

module.exports = routes;
