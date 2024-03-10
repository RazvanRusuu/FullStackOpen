const mongoose = require("mongoose");

const PersonSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const Person = mongoose.model("person", PersonSchema);

module.exports = Person;
