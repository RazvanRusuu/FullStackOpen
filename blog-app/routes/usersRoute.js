const Router = require("express").Router();

const {
  getUsers,
  createUsers,
  getUser,
} = require("../controllers/usersController");

Router.route("/").get(getUsers).post(createUsers);
Router.route("/:id").get(getUser);

module.exports = Router;
