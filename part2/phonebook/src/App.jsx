import { useState } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import AddPerson from "./components/AddPerson";
import Persons from "./components/Persons";
import {
  getPersons,
  createPerson,
  deletePerson,
  updatePerson,
} from "../api-client";
import { useEffect } from "react";

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    getPersons()
      .then((persons) => setPersons(persons))
      .catch((err) => console.log(err));
  }, []);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const handleSubmit = () => {
    const alreadyExistPerson = persons.find((pers) => pers.name === newName);
    if (alreadyExistPerson) {
      const confirm = window.confirm(
        `${newName} already in the phone book, replace the number with the new one?`
      );

      if (!confirm) return;

      updatePerson({ ...alreadyExistPerson, number: newNumber }).then(
        (person) => {
          setPersons((prev) => {
            return prev.map((pers) => (pers.id === person.id ? person : pers));
          });
        }
      );
      return;
    }

    createPerson({ name: newName, number: newNumber }).then((person) => {
      setPersons((prev) => [...prev, person]);
    });
    setNewName("");
    setNewNumber("");
  };

  const handleDelete = (person) => {
    const confirm = window.confirm(`Delete ${person.name}?`);

    if (!confirm) return;

    deletePerson(person.id).then((data) => {
      setPersons((prev) => prev.filter((pers) => pers.id !== data.id));
    });
  };

  const filteredPersons = persons.filter((pers) =>
    pers.name.toLowerCase().includes(filter.toLocaleLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={setFilter} />
      <h3>Add a new </h3>
      <AddPerson
        name={newName}
        number={newNumber}
        onNameChange={setNewName}
        onNumberChange={setNewNumber}
        onSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <Persons onDelete={handleDelete} persons={filteredPersons} />
    </div>
  );
};

export default App;
