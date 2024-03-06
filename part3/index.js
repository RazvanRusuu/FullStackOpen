const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

morgan.token("body", (req, res) => {
  return JSON.stringify(req.body);
});

const persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.post("/api/persons", async (req, res) => {
  const { name, number } = req.body;

  if (!number || !name) {
    return res.status(400).json({
      status: "fail",
      message: "The person must hava a name annd a number",
    });
  }
  const exists = persons.find((pers) => pers.name === name);

  if (exists) {
    return res.status(404).json({
      status: "fail",
      message: "A person with this name already exists",
    });
  }
  const newPerson = {
    name,
    number,
    id: Date.now(),
  };
  persons.push(newPerson);

  res.status(201).json({ status: "success", data: newPerson });
});

app.get("/api/persons", (req, res) => {
  return res.status(200).json({ status: "success", data: persons });
});

app.get("/api/persons/:id", (req, res) => {
  const id = +req.params.id;

  const person = persons.find((pers) => pers.id === id);

  if (!person) {
    return res
      .status(404)
      .json({ status: "fail", message: "No person was found with this id" });
  }

  return res.status(200).json({ status: "succes", data: person });
});

app.get("/api/info", (req, res) => {
  res.send(`<p>Phonebook has info for ${persons.length} people</p> 
            <p>${new Date().toString()}</p>`);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;

  const indexOf = persons.findIndex((pers) => pers.id === +id);
  persons.splice(indexOf, 1);
  return res.status(204).json({ status: "success", data: null });
});

const port = 8001;
app.listen(port, () => {
  console.log("server listen to" + port);
});
