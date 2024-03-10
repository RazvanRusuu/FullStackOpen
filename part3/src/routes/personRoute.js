const express = require("express");
const {
  getPersons,
  getPerson,
  createPerson,
  deletePerson,
} = require("../controllers/person");

const router = express.Router();

router.route("/").get(getPersons).post(createPerson);
router.route("/:id").get(getPerson).delete(deletePerson);

module.exports = router;
