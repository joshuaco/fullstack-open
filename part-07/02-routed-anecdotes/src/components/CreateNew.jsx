/* eslint-disable react/prop-types */
import { useField } from '../hooks';
import { useNavigate } from 'react-router-dom';

function CreateNew(props) {
  const content = useField('text');
  const author = useField('text');
  const info = useField('text');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (content.value.trim() === '') return;

    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    });

    navigate('/');
  };

  const handleReset = () => {
    content.reset();
    author.reset();
    info.reset();
  };

  const inputProps = ({ reset, ...rest }) => rest;

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name="content" {...inputProps(content)} />
        </div>
        <div>
          author
          <input
            name="author"
            type={author.type}
            value={author.value}
            onChange={author.onChange}
          />
        </div>
        <div>
          url for more info
          <input
            name="info"
            type={info.type}
            value={info.value}
            onChange={info.onChange}
          />
        </div>
        <button type="submit">create</button>
        <button type="reset" onClick={handleReset}>
          reset
        </button>
      </form>
    </div>
  );
}

export default CreateNew;
