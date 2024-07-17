import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initializeNotes } from './reducers/noteReducer';
import NoteForm from './components/NoteForm';
import Notes from './components/Notes';
import VisibilityFilter from './components/VisibilityFilter';
import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeNotes());
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
