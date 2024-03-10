const express = require('express')
const {
  getPersons,
  getPerson,
  createPerson,
  deletePerson,
  updatePerson,
} = require('../controllers/person')

const router = express.Router()

router.route('/').get(getPersons).post(createPerson)
router.route('/:id').get(getPerson).delete(deletePerson).put(updatePerson)

module.exports = router
