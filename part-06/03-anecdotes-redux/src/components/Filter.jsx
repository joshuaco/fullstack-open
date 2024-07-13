import { useDispatch } from 'react-redux';
import { filterAnecdotes } from '../reducers/filterReducer';

function Filter() {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    event.preventDefault();

    const { value } = event.target;
    dispatch(filterAnecdotes(value));
  };

  const style = {
    marginBottom: 10
  };

  return (
    <div style={style}>
      <label htmlFor="filter">Filter</label>
      <input type="text" onChange={handleChange} />
    </div>
  );
}

export default Filter;
