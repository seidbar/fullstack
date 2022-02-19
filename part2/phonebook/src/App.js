import { useEffect, useState } from 'react';
import { Filter } from './components/Filter';
import { PersonForm } from './components/PersonForm';
import { Persons } from './components/Persons';
import axios from 'axios';

const App = () => {
  const getPersons = () => {
    axios
      .get('http://localhost:3001/persons')
      .then((response) => setPersons(response.data));
  };

  useEffect(getPersons, []);

  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [number, setNumber] = useState('');
  const [filter, setFilter] = useState('');

  const handleChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const handleSearch = (event) => {
    setFilter(event.target.value);
    const filteredPersons = persons.filter((person) =>
      person.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setPersons(filteredPersons);
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
