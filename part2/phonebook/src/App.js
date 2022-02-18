import { useState } from 'react';
import { Filter } from './components/Filter';
import { PersonForm } from './components/PersonForm';
import { Persons } from './components/Persons';

const App = () => {
  const personDB = [
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ];

  const [persons, setPersons] = useState(personDB);
  const [newName, setNewName] = useState('');
  const [number, setNumber] = useState('');
  const [filter, setFilter] = useState('');

  const handleChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const handleSearch = (event) => {
    setFilter(event.target.value);
    if (filter === '') {
      setPersons(personDB);
    } else {
      const filteredPersons = personDB.filter((person) =>
        person.name.toLowerCase().includes(event.target.value.toLowerCase())
      );
      setPersons(filteredPersons);
    }
  };

  const addName = (event) => {
    event.preventDefault();
    const found = persons.find((entry) => entry.name === newName);
    if (found) {
      alert(`${newName} was already added to the phonebook`);
    } else {
      const newPersons = [...persons];
      setPersons(newPersons.concat({ name: newName, number: number }));
    }
    setNewName('');
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleSearch={handleSearch} />
      <h2>add a new</h2>
      <PersonForm
        addName={addName}
        newName={newName}
        setNewName={setNewName}
        setNumber={setNumber}
        handleChange={handleChange}
        number={number}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  );
};

export default App;
