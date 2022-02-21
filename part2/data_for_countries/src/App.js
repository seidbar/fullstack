import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [countries, setCountries] = useState([]);
  const [selection, setSelection] = useState(countries);
  const [filter, setFilter] = useState('');
  const [weather, setWeather] = useState();

  const country = selection[0];
  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    axios
      .get('https://restcountries.com/v2/all')
      .then((res) => setCountries(res.data));
  }, [setCountries]);

  // Get weather data if the details page is loaded
  useEffect(() => {
    if (selection.length === 1) {
      axios
        .get(
          `http://api.openweathermap.org/data/2.5/weather?units=metric&q=${country.capital},${country.cioc}&appid=${apiKey} `
        )
        .then((res) => setWeather(res.data));
    }
  }, [selection, apiKey, country]);

  const searchCountries = (event) => {
    setFilter(event.target.value);
    const filteredCountries = countries.filter((country) =>
      country.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setSelection(filteredCountries);
  };

  return (
    <div className="App">
      <div>
        find countries{' '}
        <input type="text" onChange={searchCountries} value={filter} />
        {selection.length > 1 &&
          selection.length < 10 &&
          selection.map((country) => (
            <div key={country.numericCode}>
              {country.name}{' '}
              <button
                onClick={() => {
                  setSelection([country]);
                  setFilter('');
                }}
              >
                show
              </button>
            </div>
          ))}
        {selection.length > 10 && filter !== '' && (
          <p>Too many matches, specify another filter</p>
        )}
        {selection.length === 1 && (
          <div>
            <h1>{country.name}</h1>
            <p>capital {country.capital}</p>
            <p>area {country.area}</p>
            <h3>languages:</h3>
            <ul>
              {country.languages.map((language) => (
                <li key={language.name}>{language.name}</li>
              ))}
            </ul>
            <img src={country.flags.png} alt={`flag of ${country.name}`} />
            <h2>Weather in {country.capital}</h2>
            {weather && (
              <>
                <p>temperature {weather.main.temp} Celsius</p>
                <img
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={weather.weather[0].description}
                />
                <p>wind {weather.wind.speed} m/s</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
