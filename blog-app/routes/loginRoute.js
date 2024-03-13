const Router = require("express").Router();
const login = require("../controllers/loginController");

Router.post("/login", login);

module.exports = Router;
