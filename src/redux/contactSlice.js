import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const contactSlice = createSlice({
  // name slice
  name: 'contacts',
  // begin state
  initialState: {
    contacts: [],
    filter: '',
  },
  // object reducers
  reducers: {
    addContacts(state, action) {
      state.contacts.push(action.payload);
    },
    deleteContacts(state, action) {
      return {
        ...state,
        contacts: state.contacts(contact => contact.id !== action.payload),
      };
    },
    setFilter(state, action) {
      return { ...state, filter: action.payload };
    },
  },
});
// generator actions
export const { addContacts, deleteContacts, setFilter } = contactSlice.actions;
//  reducers slice
const persistConfig = {
  key: 'root',
  storage,
};
export const persistedContactReducer = persistReducer(
  persistConfig,
  contactSlice.reducer
);

// selectors

export const getContacts = state => state.contacts.contacts;
export const getFilter = state => state.contacts.filter;
