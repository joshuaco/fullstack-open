/* eslint-disable react/prop-types */
function Country({ country }) {
  return (
    <>
      <div>
        <h1>{country.name.common}</h1>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>
      </div>

      <div>
        <h2>Languages</h2>
        <ul>
          {Object.entries(country.languages).map(([key, value]) => (
            <li key={key}>{value}</li>
          ))}
        </ul>
      </div>
      <div>
        <img src={country.flags.png} alt={country.flags.alt} />
      </div>
    </>
  );
}

export default Country;
