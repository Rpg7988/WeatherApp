import React, { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiKey = "aca91957172f926d0a8fab6b43632469";

  const getWeather = async () => {
    if (city === '') {
      setError('Please enter a city name');
      setWeather(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();

      if (data.cod === 404) {
        setError('City not found. Try again.');
        setWeather(null);
      } else {
        setWeather(data);
        setError(null);
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred while fetching the weather data.');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>Rpg7988 Weather App</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      /> 
      <button onClick={getWeather} disabled={loading}>
        {loading ? 'Loading...' : 'Get Weather'}
      </button>
      {loading && <p>Loading...</p>}
      {weather && <button id='clearBtn' onClick={() => setWeather(null)}>Clear Weather</button>}

      {error && <p className="error">{error}</p>}
      {weather && (
        <div className="weather-container" style={{  padding: '20px', borderRadius: '10px' }}>
          <h2>{weather.name}</h2>
          <h3>Temperature: {weather.main.temp}°C</h3>
          <p>Feels Like: {weather.main.feels_like}°C</p>
          <p>Min Temperature: {weather.main.temp_min}°C</p>
          <p>Max Temperature: {weather.main.temp_max}°C</p>
          <p>Sunrise: {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</p>
          <p>Sunset: {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</p>
          <p>Latitude: {weather.coord.lat}</p>
          <p>Longitude: {weather.coord.lon}</p>
          <p>Country: {weather.sys.country}</p>
          <p>Timezone: {weather.timezone / 3600} hours</p>
          <p>Visibility: {weather.visibility / 1000} km</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
          <p>Wind Direction: {weather.wind.deg}°</p>
          <p>Weather: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Pressure: {weather.main.pressure} hPa</p>
          <p>Cloudiness: {weather.clouds.all}%</p>
          <p>
            Weather Icon:{' '}
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
              alt="weather icon"
            />
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
