/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { getAll, create, remove, update } from './services/contact';
import Search from './components/Search';
import ContactForm from './components/ContactForm';
import Contacts from './components/Contacts';
import Notification from './components/Notification';

import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    getAll()
      .then((data) => setPersons(data))
      .catch(() => {
        setMessage('Error connecting to server, try again later');
        clearMessage();
      });
  }, []);

  const handleNameChange = (event) => {
    const newInput = event.target.value;
    if (newInput.startsWith(' ')) return;
    setNewName(newInput);
  };

  const handleNumberChange = (event) => {
    const newPhone = event.target.value;
    setPhone(newPhone);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newName === '' || phone === '') {
      setMessage('Field cannot be empty');
      return;
    }

    setMessage('');
    const personExists = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    if (personExists && personExists.number === phone) {
      setMessage(`${newName} is already added to phonebook`);
      return;
    } else if (personExists) {
      const confirmed = window.confirm(
        `${newName} is already added to phonebook, replace the old number with the new one?`
      );
      if (!confirmed) return;

      updatePerson(personExists.id, phone);
      return;
    }

    const newObject = {
      name: newName,
      number: phone
    };

    create(newObject).then((data) => setPersons([...persons, data]));

    setNewName('');
    setPhone('');
  };

  const filterPersons = (newSearch) => {
    // Filter persons by name
    if (newSearch === '') {
      return [];
    }
    const filteredPersons = persons.filter((person) =>
      person.name.toLowerCase().startsWith(newSearch.toLowerCase())
    );

    return filteredPersons;
  };

  const updatePerson = (id, newNumber) => {
    const person = persons.find((person) => person.id === id);
    const updatedPerson = { ...person, number: newNumber };

    update(id, updatedPerson).then((data) =>
      setPersons(persons.map((p) => (p.id === id ? data : p)))
    );
    setNewName('');
    setPhone('');
  };

  const deletePerson = (id, name) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${name}?`
    );
    if (!confirmed) return;
    const newPersons = persons.filter((person) => person.id !== id);
    setPersons(newPersons);
    remove(id);
  };

  const clearMessage = () => {
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div>
      <h1>PhoneBook</h1>
      <Search filterPersons={filterPersons} />

      <h2>Add a new contact</h2>

      <ContactForm
        newName={newName}
        phone={phone}
        handleSubmit={handleSubmit}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      {message && <Notification message={message} />}

      {persons.length > 0 ? (
        <Contacts persons={persons} deletePerson={deletePerson} />
      ) : (
        <p>No contacts found</p>
      )}
    </div>
  );
}

export default App;
