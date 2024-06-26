/* eslint-disable react/prop-types */
import './Note.css';

const Note = ({ note, toggleImportance, onDelete }) => {
  const label = note.important ? 'Make not important' : 'Make important';

  return (
    <li className="note">
      <span>{note.content}</span>
      <button onClick={toggleImportance}>{label}</button>
      <button onClick={onDelete}>Remove</button>
    </li>
  );
};

export default Note;
