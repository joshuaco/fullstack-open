import { filterChange } from '../reducers/filterReducer';
import { useDispatch } from 'react-redux';

function VisibilityFilter() {
  const dispatch = useDispatch();

  return (
    <div>
      <label htmlFor="all">all</label>
      <input
        type="radio"
        name="filter"
        id="all"
        onChange={() => dispatch(filterChange('ALL'))}
      />

      <label htmlFor="important">important</label>
      <input
        type="radio"
        name="filter"
        id="important"
        onChange={() => dispatch(filterChange('IMPORTANT'))}
      />

      <label htmlFor="unimportant">non-important</label>
      <input
        type="radio"
        name="filter"
        id="unimportant"
        onChange={() => dispatch(filterChange('NONIMPORTANT'))}
      />
    </div>
  );
}

export default VisibilityFilter;
