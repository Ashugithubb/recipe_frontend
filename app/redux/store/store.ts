'use client';

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import userReducer from '../slice/user.slice';
import storage from 'redux-persist/lib/storage'; 
import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'], 
};

const rootReducer = combineReducers({
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

