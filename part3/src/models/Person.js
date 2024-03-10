const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI.replace("<pass>", process.env.MONGO_PASS))
  .then((con) => console.log("Connect successfully"))
  .catch((err) => console.log(err + "err connected to mongo"));

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

PersonSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Person = mongoose.model("person", PersonSchema);

module.exports = Person;
