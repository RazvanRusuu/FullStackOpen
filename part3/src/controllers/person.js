const Person = require("../models/Person");

exports.getPersons = async (req, res) => {
  try {
    const persons = await Person.find({});
    return res.status(200).json({ status: "success", data: persons });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "failed", message: "somthing wnet wrong" });
  }
};

exports.getPerson = async (req, res) => {
  const id = req.params.id;

  const person = await Person.findById(id);

  if (!person) {
    return res
      .status(404)
      .json({ status: "fail", message: "No person was found with this id" });
  }

  return res.status(200).json({ status: "succes", data: person });
};

exports.createPerson = async (req, res) => {
  const { name, number } = req.body;

  if (!number || !name) {
    return res.status(400).json({
      status: "fail",
      message: "The person must hava a name annd a number",
    });
  }

  const exists = await Person.findOne({ name: name });

  if (exists) {
    return res.status(404).json({
      status: "fail",
      message: "A person with this name already exists",
    });
  }

  const newPerson = await Person.create({ name, number });

  res.status(201).json({ status: "success", data: newPerson });
};

exports.deletePerson = async (req, res) => {
  try {
    const id = req.params.id;
    await Person.deleteOne({ _id: id });
    return res.status(204).json({ status: "success", data: null });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "fail", message: "Something went wrong" });
  }
};
