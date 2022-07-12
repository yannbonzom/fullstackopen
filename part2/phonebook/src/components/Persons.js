import React from "react";

const Persons = ({ persons, deleteContact }) => {
  const deleteWithConfirm = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) deleteContact(id, name);
  };

  return (
    <>
      {persons.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}{" "}
          <button onClick={() => deleteWithConfirm(person.id, person.name)}>
            delete
          </button>
        </div>
      ))}
    </>
  );
};

export default Persons;
