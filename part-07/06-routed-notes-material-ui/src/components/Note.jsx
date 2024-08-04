/* eslint-disable react/prop-types */

function Note({ note }) {
  return (
    <div>
      <h2>{note.content}</h2>

      <p>{note.user}</p>

      <div>
        <strong>{note.important ? 'important' : ''}</strong>
      </div>
    </div>
  );
}

export default Note;
