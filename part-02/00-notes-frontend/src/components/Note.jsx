/* eslint-disable react/prop-types */
const Note = ({ note, toggleImportance, onDelete }) => {
  const label = note.important ? 'Make not important' : 'Make important';

  return (
    <li>
      {note.content}
      <button onClick={toggleImportance}>{label}</button>
      <button onClick={onDelete}>Remove</button>
    </li>
  );
};

export default Note;
