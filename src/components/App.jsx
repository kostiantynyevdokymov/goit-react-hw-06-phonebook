import { useEffect, useState } from 'react';
import Main from './Main/Main';
import { nanoid } from 'nanoid';
import Phonebook from './Phonebook/Phonebook';
import Contacts from './Phonebook/Contacts/Contacts';

const App = () => {
  const [contacts, setContacts] = useState(() => {
    const localContacts = window.localStorage.getItem('contacts');
    const parcedContacts = JSON.parse(localContacts);
    return parcedContacts || [];
  });

  const [filter, setFilter] = useState('');

  const handleChange = event => {
    setFilter(event.currentTarget.value);
  };

  const formSubmitHandle = data => {
    const id = nanoid();
    if (contacts.filter(contacts => contacts.name === data.name).length > 0) {
      alert(`${data.name} is already in contacts`);
      return;
    }
    setContacts(prevState => {
      return [
        ...prevState,
        {
          name: data.name,
          number: data.number,
          id: id,
        },
      ];
    });
  };

  const onClickDelete = id => {
    setContacts(contacts.filter(contacts => contacts.id !== id));
  };

  const normalizeFilter = filter.toLowerCase();
  const visibleContacts = contacts.filter(contacts =>
    contacts.name.toLowerCase().includes(normalizeFilter)
  );

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <Main title="Phonebook">
      <Phonebook
        onChange={handleChange}
        onSubmit={formSubmitHandle}
        contactsList={visibleContacts}
        notEmptyList={setContacts.length}
        valueFilter={setFilter}
      />
      {contacts.length > 0 ? (
        <Contacts
          name="Contacts"
          contactsList={visibleContacts}
          onChange={handleChange}
          value={setFilter}
          onClickDelete={onClickDelete}
        />
      ) : (
        <p>Phonebook empty</p>
      )}
    </Main>
  );
};
export default App;
