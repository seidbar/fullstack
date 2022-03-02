export const PersonForm = ({
  addName,
  newName,
  number,
  handleChange,
  setNewName,
  setNumber,
}) => {
  return (
    <form onSubmit={addName}>
      <div>
        name: <input value={newName} onChange={handleChange(setNewName)} />
      </div>
      <div>
        number: <input value={number} onChange={handleChange(setNumber)} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
