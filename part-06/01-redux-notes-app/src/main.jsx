import React from 'react';
import ReactDOM from 'react-dom/client';
import { legacy_createStore as createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import noteReducer from './reducers/noteReducer.js';
import filterReducer from './reducers/filterReducer.js';

import App from './App.jsx';
import './index.css';

const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer
});

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
