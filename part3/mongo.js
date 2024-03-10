const Person = require('./src/models/Person')
const mongoose = require('mongoose')
const { MONGO_URI } = require('./utilis/config')
require('dotenv').config()

const [first, second, password, name, number] = process.argv

const url = MONGO_URI

mongoose
  .connect(url)
  .then(() => console.log('connected successfully'))
  .catch(() => console.log('something went wrong - bd connection'))

const person = new Person({ name, number })

person.save().then((res) => {
  console.log(res)
})

Person.find({}).then((res) => {
  console.log(res)
  mongoose.connection.close()
})
