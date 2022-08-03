import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import contactHandler from "./services/contacts";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [filter, newFilter] = useState("");
  const [notifMessage, setNotifMessage] = useState(null);
  const [isError, setIsError] = useState(null);

  const addNotifMessage = (message, isError) => {
    setNotifMessage(message);
    setIsError(isError);
    setTimeout(() => setNotifMessage(null), 5000);
  };

  useEffect(() => {
    contactHandler.getAll().then((res) => setPersons(res));
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const p = persons.find((person) => person.name === newName);
        const updatedP = { ...p, number: newNum };
        contactHandler.updateNumber(updatedP).then((updatedContact) => {
          setPersons(
            persons.map((person) =>
              person.id !== p.id ? person : updatedContact
            )
          );
          addNotifMessage(`Changed number of ${updatedContact.name}`, false);
        });
      }
    } else {
      const personObject = {
        name: newName,
        number: newNum,
        id: persons.length + 1,
      };
      contactHandler
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          addNotifMessage(`Added ${returnedPerson.name}`, false);
        })
        .catch((error) => {
          console.log(error);
          addNotifMessage(
            error.response.data.error.message || error.response.data.error,
            true
          );
        });
    }
    setNewName("");
    setNewNum("");
  };

  const deleteContact = (id, name) => {
    contactHandler
      .deleteContact(id)
      .then(() => {
        setPersons(persons.filter((p) => p.id !== id));
        addNotifMessage(`Deleted ${name}`, false);
      })
      .catch(() => {
        addNotifMessage(`${name} has already been removed from server`, true);
        setPersons(persons.filter((p) => p.id !== id));
      });
  };

  const personsToShow =
    filter === ""
      ? persons
      : persons.filter((person) => person.name.toLowerCase().includes(filter));

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notifMessage} isError={isError} />

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
      <Persons persons={personsToShow} deleteContact={deleteContact} />
    </div>
  );
}

export default App;
