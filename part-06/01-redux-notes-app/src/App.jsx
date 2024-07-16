import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setNotes } from './reducers/noteReducer';
import noteService from './services/notes';
import NoteForm from './components/NoteForm';
import Notes from './components/Notes';
import VisibilityFilter from './components/VisibilityFilter';
import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    noteService.getAll().then((notes) => dispatch(setNotes(notes)));
  }, []);

  return (
    <div>
      <NoteForm />
      <VisibilityFilter />
      <Notes />
    </div>
  );
}

export default App;
