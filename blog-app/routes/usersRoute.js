const Router = require("express").Router();

const { getUsers, createUsers } = require("../controllers/usersController");

Router.route("/").get(getUsers).post(createUsers);

module.exports = Router;
