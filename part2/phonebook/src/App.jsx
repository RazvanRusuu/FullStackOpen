import { useState } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import AddPerson from "./components/AddPerson";
import Persons from "./components/Persons";
import { useEffect } from "react";

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    const getPersons = async () => {
      const response = await axios.get("http://localhost:3001/persons");
      setPersons(response.data);
    };

    getPersons();
  }, []);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const handleSubmit = () => {
    setPersons((prev) => {
      const exist = prev.find((pers) => pers.name === newName);
      if (exist) {
        alert(`${newName} already in the phone book`);
        return prev;
      }

      return [...prev, { name: newName, number: newNumber }];
    });
    setNewName("");
    setNewNumber("");
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
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
