import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [filter, newFilter] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => setPersons(response.data));
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name === newName))
      alert(`${newName} is already added to phonebook`);
    else {
      const personObject = {
        name: newName,
        number: newNum,
        id: persons.length + 1,
      };
      setPersons(persons.concat(personObject));
    }
    setNewName("");
    setNewNum("");
  };

  const personsToShow =
    filter === ""
      ? persons
      : persons.filter((person) => person.name.toLowerCase().includes(filter));

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter
        value={filter}
        onChange={(event) => newFilter(event.target.value.toLowerCase())}
      />

      <h2>add a new</h2>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        newNameOnChange={(event) => setNewName(event.target.value)}
        newNum={newNum}
        newNumOnChange={(event) => setNewNum(event.target.value)}
      />

      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  );
}

export default App;
