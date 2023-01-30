import { Component } from 'react';
import { ContactForm } from '../components/ContactForm/ContactForm';
import { Filter } from '../components/Filter/Filter';
import { ContactList } from '../components/ContactList/ContactList';
import { v4 as uuidv4 } from 'uuid';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  componentDidMount() {
    const newContacts =
      JSON.parse(localStorage.getItem('contacts')) ?? this.state.contacts;
    this.setState({ contacts: newContacts });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addNewContact = newContact => {
    this.setState(prev => ({ contacts: [...prev.contacts, newContact] }));
  };

  deleteContactById = contactId => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(el => el.id !== contactId),
    }));
  };

  handleSubmit = event => {
    event.preventDefault();
    const form = event.currentTarget;
    const name = form.elements.name.value;
    const tel = form.elements.number.value;
    const isNameExist = this.state.contacts.find(el => el.name === name);
    if (isNameExist) {
      alert(`${name} is already in contacts`);
    } else {
      const newContact = {
        id: uuidv4(),
        name: name,
        number: tel,
      };
      this.addNewContact(newContact);
    }
    form.reset();
  };

  onSearchChange = event => {
    this.setState({ filter: event.target.value });
    console.log(this.state);
  };

  applySearch = () => {
    return this.state.contacts.filter(el =>
      el.name.toLowerCase().includes(this.state.filter.toLowerCase().trim())
    );
  };

  render() {
    return (
      <>
        <h2>Phonebook</h2>
        <ContactForm handleSubmit={this.handleSubmit}></ContactForm>
        <h2>Contacts</h2>
        <Filter onSearchChange={this.onSearchChange}></Filter>
        <ContactList
          filteredArrOfContacts={this.applySearch()}
          deleteContactById={this.deleteContactById}
        ></ContactList>
      </>
    );
  }
}
