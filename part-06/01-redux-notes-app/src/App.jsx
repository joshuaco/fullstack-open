import NoteForm from './components/NoteForm';
import Notes from './components/Notes';
import './App.css';
import VisibilityFilter from './components/VisibilityFilter';

function App() {
  return (
    <div>
      <NoteForm />
      <VisibilityFilter />
      <Notes />
    </div>
  );
}

export default App;
