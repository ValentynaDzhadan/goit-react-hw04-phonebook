import { useState, useEffect } from 'react';
import { ContactForm } from '../components/ContactForm/ContactForm';
import { Filter } from '../components/Filter/Filter';
import { ContactList } from '../components/ContactList/ContactList';
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_CONTACTS_KEY = 'contacts';

const initialContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_CONTACTS_KEY))?.length > 0
      ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_CONTACTS_KEY))
      : initialContacts
  );
  const [filter, setFilter] = useState('');

  const addNewContact = newContact => {
    setContacts(prev => [...prev, newContact]);
  };

  const deleteContactById = contactId => {
    setContacts(prev => prev.filter(el => el.id !== contactId));
  };

  const onSearchChange = event => {
    setFilter(event.target.value);
  };

  const applySearch = () => {
    return contacts.filter(el =>
      el.name.toLowerCase().includes(filter.toLowerCase().trim())
    );
  };

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_CONTACTS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const handleSubmit = event => {
    event.preventDefault();
    const form = event.currentTarget;
    const name = form.elements.name.value;
    const tel = form.elements.number.value;
    const isNameExist = contacts.find(el => el.name === name);
    if (isNameExist) {
      alert(`${name} is already in contacts`);
    } else {
      const newContact = {
        id: uuidv4(),
        name: name,
        number: tel,
      };
      addNewContact(newContact);
    }
    form.reset();
  };

  return (
    <>
      <h2>Phonebook</h2>
      <ContactForm handleSubmit={handleSubmit}></ContactForm>
      <h2>Contacts</h2>
      <Filter onSearchChange={onSearchChange}></Filter>
      <ContactList
        filteredArrOfContacts={applySearch()}
        deleteContactById={deleteContactById}
      ></ContactList>
    </>
  );
};
