import { useState } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { useLocalStorage } from 'hooks/useLocalStorage';

export const App = () => {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const handleAddContact = contact => {
    if (
      contacts.some(({ name }) => {
        return name.toLowerCase() === contact.name.toLowerCase();
      })
    ) {
      alert(`${contact.name} is already in contacts`);
      return;
    }
    const newContact = { ...contact, id: nanoid() };
    setContacts(prev => [...prev, newContact]);
  };

  const handleDelete = id => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
  };

  const handleFilter = e => {
    setFilter(e.target.value.trim().toLowerCase());
  };

  const getFilteredContacts = () => {
    return contacts.filter(({ name }) => name.toLowerCase().includes(filter));
  };
  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm handleAddContact={handleAddContact} />
      <h2>Contacts</h2>
      {contacts.length ? (
        <>
          <Filter handleFilter={handleFilter} />
          <ContactList
            contacts={getFilteredContacts()}
            handleDelete={handleDelete}
          />
        </>
      ) : (
        <p>No contacts added</p>
      )}
    </div>
  );
};
