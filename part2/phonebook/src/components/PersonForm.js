import React from "react";

const PersonForm = ({
  onSubmit,
  newName,
  newNameOnChange,
  newNum,
  newNumOnChange,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={newName} onChange={newNameOnChange} />
      </div>
      <div>
        number: <input value={newNum} onChange={newNumOnChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
