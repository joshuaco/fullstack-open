/* eslint-disable react/prop-types */
function Button({ children, id, onVote }) {
  return (
    <button type="button" id={id} onClick={onVote}>
      {children}
    </button>
  );
}

export default Button;
