import { useDispatch, useSelector } from 'react-redux';
import { toggleImportanceOf } from '../reducers/noteReducer';

function Note({ note, handleClick }) {
  return (
    <li onClick={handleClick}>
      {note.content} <strong>{note.important ? 'important' : ''}</strong>
    </li>
  );
}

function Notes() {
  const dispatch = useDispatch();
  const notes = useSelector(({ filter, notes }) => {
    if (filter === 'ALL') {
      return notes;
    }
    return filter === 'IMPORTANT'
      ? notes.filter((note) => note.important)
      : notes.filter((note) => !note.important);
  });

  return (
    <>
      {notes.length > 0 && (
        <ul>
          {notes.map((note) => (
            <Note
              key={note.id}
              note={note}
              handleClick={() => dispatch(toggleImportanceOf(note.id))}
            />
          ))}
        </ul>
      )}
    </>
  );
}

export default Notes;
