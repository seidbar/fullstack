import { useEffect, useState } from 'react';
import { Filter } from './components/Filter';
import { PersonForm } from './components/PersonForm';
import { People } from './components/People';
import phoneService from './services/phonenumbers';
import { Notification } from './components/Notification';

const App = () => {
  const [people, setPeople] = useState([]);
  const [newName, setNewName] = useState('');
  const [number, setNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState(null);

  const getPeople = () => {
    phoneService.getAll().then((people) => setPeople(people));
  };

  const addPerson = (person) => {
    phoneService.create(person).then((response) => {
      const newPeople = [...people];
      setPeople(newPeople.concat(response));
    });
  };

  const deletePerson = (person) => {
    const confirm = window.confirm(`Delete ${person.name}`);
    if (confirm) {
      phoneService.remove(person.id).then((res) => {
        res && setPeople(people.filter((p) => p.id !== person.id));
      });
    }
  };

  useEffect(getPeople, []);

  const handleChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const handleSearch = (event) => {
    setFilter(event.target.value);
    const filteredPersons = people.filter((person) =>
      person.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setPeople(filteredPersons);
  };

  const addName = (event) => {
    event.preventDefault();
    const found = people.find((entry) => entry.name === newName);
    console.log({ found });
    if (found) {
      const confirm = window.confirm(
        `${newName} was already added to the phonebook, replace old number with a new one?`
      );
      if (confirm) {
        phoneService
          .update(found.id, { name: newName, number: number })
          .then((returnedPerson) =>
            setPeople(
              people.map((person) =>
                person.id !== found.id ? person : returnedPerson
              )
            )
          );
      }
    } else {
      addPerson({ name: newName, number: number });
    }
    setNewName('');
    setNumber('');
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
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
      <People people={people} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
