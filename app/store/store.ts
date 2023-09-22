"use client"

import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import authSlice from '../authslice/authslice';
import { RealtyApi } from '../appApi/api';
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from "redux-persist/lib/storage";
import thunk from 'redux-thunk';

import { createSerializableStateInvariantMiddleware } from '@reduxjs/toolkit';


const reducer = combineReducers({
  user: authSlice,
  [RealtyApi.reducerPath]: RealtyApi.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [RealtyApi.reducerPath],
};

const persistedReducer = persistReducer(persistConfig, reducer);

const middleware = [
  thunk,
  RealtyApi.middleware,
  createSerializableStateInvariantMiddleware(),
];

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  }).concat(RealtyApi.middleware),
});

const persistor = persistStore(store);

setupListeners(store.dispatch);

export { store, persistor };