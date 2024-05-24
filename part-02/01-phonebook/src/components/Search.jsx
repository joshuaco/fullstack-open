/* eslint-disable react/prop-types */
import { useState } from 'react';

function FilteredList({ filter }) {
  return (
    <ul>
      {filter.map((person, index) => (
        <li key={index}>
          <p>{person.name}</p>
          <p>{person.number}</p>
        </li>
      ))}
    </ul>
  );
}

function Search({ filterPersons }) {
  const [searchPerson, setSearchPerson] = useState('');
  const [filter, setFilter] = useState([]);

  const handleSearchChange = (event) => {
    const newSearch = event.target.value;
    if (newSearch.startsWith(' ')) return;

    setSearchPerson(newSearch);
    setFilter(filterPersons(newSearch));
  };
  return (
    <section>
      <label htmlFor="search">Search</label>
      <input
        type="text"
        className="search"
        placeholder="Arto Hellas"
        value={searchPerson}
        onChange={handleSearchChange}
      />

      {filter.length > 0 && <FilteredList filter={filter} />}
    </section>
  );
}

export default Search;
