import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import CountryList from './components/CountryList';

const API_URL = 'https://studies.cs.helsinki.fi/restcountries/api/all';

function App() {
  const [value, setValue] = useState('');
  const [countries, setCountries] = useState([]);
  const [showCountry, setShowCountry] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    axios.get(API_URL).then((response) => {
      setCountries(response.data);
    });
  }, []);

  useEffect(() => {
    if (value === '') {
      setFilteredCountries([]);
      setShowCountry(false);
      return;
    }

    console.log('Filtering...');

    const filter = countries.filter((country) =>
      country.name.common.toLowerCase().includes(value.toLowerCase())
    );
    console.log(filter);
    setFilteredCountries(filter);
  }, [value, countries]);

  return (
    <>
      <form>
        <input
          type="text"
          placeholder="Search for a country..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </form>
      <div>
        <CountryList
          countries={filteredCountries}
          showCountry={showCountry}
          setShowCountry={setShowCountry}
        />
      </div>
    </>
  );
}

export default App;
