import { legacy_createStore as createStore } from 'redux';
import { noteReducer } from './reducers/noteReducer';
import './App.css';

const store = createStore(noteReducer);

store.dispatch({
  type: 'NEW_NOTE',
  payload: {
    id: 1,
    content: 'The app state is in redux store',
    important: true
  }
});

store.dispatch({
  type: 'NEW_NOTE',
  payload: {
    id: 2,
    content: 'state changes are made with actions',
    important: false
  }
});

function App() {
  return (
    <div>
      <ul>
        {store.getState().map((note) => (
          <li key={note.id}>
            {note.content} <strong>{note.important ? 'important' : ''}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
