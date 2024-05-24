import { useState } from 'react';
import Country from './Country';

/* eslint-disable react/prop-types */
function CountryList({ countries, showCountry, setShowCountry }) {
  const [country, setCountry] = useState({});

  const handleClick = (country) => {
    setShowCountry(!showCountry);
    setCountry(country);
  };

  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (countries.length === 1) {
    return <Country country={countries[0]} />;
  }
  return (
    <>
      {showCountry ? (
        <Country country={country} />
      ) : (
        <ul>
          {countries.map((country) => (
            <li key={country.name.common}>
              <p>{country.name.common}</p>
              <button onClick={() => handleClick(country)}>show</button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default CountryList;
