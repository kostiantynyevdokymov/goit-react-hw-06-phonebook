import { configureStore } from '@reduxjs/toolkit';
import { persistStore, PERSIST } from 'redux-persist';
import { persistedContactReducer } from './contactSlice';
// create store
export const store = configureStore({
  reducer: {
    contacts: persistedContactReducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: { ignoredActions: [PERSIST] },
    });
  },
});

export const persistor = persistStore(store);
