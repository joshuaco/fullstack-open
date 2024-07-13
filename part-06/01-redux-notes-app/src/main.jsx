import React from 'react';
import ReactDOM from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import noteReducer from './reducers/noteReducer.js';
import filterReducer from './reducers/filterReducer.js';
import App from './App.jsx';
import './index.css';

const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer
  }
});

console.log(store.getState());

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
