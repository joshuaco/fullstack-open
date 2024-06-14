/* eslint-disable react/prop-types */
function NoteForm({ addNote, newNote, handleNoteChange }) {
  return (
    <form onSubmit={addNote}>
      <input type="text" value={newNote} onChange={handleNoteChange} />
      <button type="submit">Add Note</button>
    </form>
  );
}

export default NoteForm;
