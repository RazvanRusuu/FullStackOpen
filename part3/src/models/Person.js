const mongoose = require('mongoose')
const { MONGO_URI } = require('../../utilis/config')

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('Connect successfully'))
  .catch((err) => console.log(err + 'err connected to mongo'))

const PersonSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true,
    minLength: 8,
  },
  name: {
    type: String,
    required: true,
    minLength: 3,
  },
})

PersonSchema.path('number').validate(function (v) {
  if (typeof v === 'string') {
    const [first, second] = v.split('-')
    if ((!first, !second))
      throw new Error('Number `{VALUE} must be separtated by `-`')
    if (first.length < 2 || first.length < 3 || isNaN(first) || isNaN(second)) {
      return false
    }
  }
  return true
}, 'Number `{VALUE}` is not valid number')

PersonSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Person = mongoose.model('person', PersonSchema)

module.exports = Person
