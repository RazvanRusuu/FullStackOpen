const Person = require("./src/models/Person");
const mongoose = require("mongoose");
require("dotenv").config();

const [first, second, password, name, number] = process.argv;
console.log(name, number);

const url = process.env.MONGO_URI.replace("<pass>", password);

mongoose
  .connect(url)
  .then(() => console.log("connected successfully"))
  .catch((err) => console.log("something went wrong - bd connection"));

const person = new Person({ name, number });

person.save().then((res) => {
  console.log(res);
  mongoose.connection.close();
});
