import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [value, setValue] = useState('');
  const [rates, setRates] = useState({});
  const [currency, setCurrency] = useState(null);

  useEffect(() => {
    console.log('effect run, currency is now', currency);

    if (currency) {
      axios
        .get(`https://open.er-api.com/v6/latest/${currency}`)
        .then((response) => setRates(response.data.rates));
    }
  }, [currency]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const onSearch = (e) => {
    e.preventDefault();
    setCurrency(value);
  };

  return (
    <>
      <form onSubmit={onSearch}>
        <div>
          <label htmlFor="currency">Currency</label>
          <input type="text" value={value} onChange={handleChange} />
        </div>
        <button type="submit">Exchange rate</button>
      </form>
      <pre>{JSON.stringify(rates, null, 2)}</pre>
    </>
  );
}

export default App;
