const Person = require('../models/Person')

exports.getPersons = async (req, res) => {
  try {
    const persons = await Person.find({})
    return res.status(200).json({ status: 'success', data: persons })
  } catch (error) {
    next(error)
  }
}
exports.updatePerson = async (req, res, next) => {
  try {
    const { name, number } = req.body
    const id = req.params.id

    const updatedPerson = await Person.findByIdAndUpdate(
      id,
      { name, number },
      { new: true, runValidators: true }
    )

    return res.status(201).json({ message: 'success', data: updatedPerson })
  } catch (error) {
    next(error)
  }
}

exports.getPerson = async (req, res, next) => {
  try {
    const id = req.params.id

    const person = await Person.findById(id)

    if (!person) {
      return res
        .status(404)
        .json({ status: 'fail', message: 'No person was found with this id' })
    }

    return res.status(200).json({ status: 'succes', data: person })
  } catch (error) {
    next(error)
  }
}

exports.createPerson = async (req, res, next) => {
  try {
    const { name, number } = req.body

    if (!number || !name) {
      return res.status(400).json({
        status: 'fail',
        message: 'The person must hava a name annd a number',
      })
    }

    const exists = await Person.findOneAndUpdate(
      { name: name },
      { name, number },
      { new: true }
    )

    if (exists) {
      return res.status(201).json({ message: 'succes', data: exists })
    }

    const newPerson = await Person.create({ name, number })

    res.status(201).json({ status: 'success', data: newPerson })
  } catch (error) {
    next(error)
  }
}

exports.deletePerson = async (req, res, next) => {
  try {
    const id = req.params.id
    await Person.deleteOne({ _id: id })
    return res.status(204).json({ status: 'success', data: null })
  } catch (error) {
    next(err)
  }
}
