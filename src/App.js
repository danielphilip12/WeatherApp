import logo from './logo.svg';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState('');

  const getWeather = async () => {
    const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`);
    console.log(response);
    setWeather(response.data);
  }

  const getWeatherByGeo = async (lat, lon) => {
    const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}`);
    console.log(response);
    setWeather(response.data);
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          getWeatherByGeo(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }, []);

  return (
    <div className="container">
      <h1>Weather App</h1>
      <input className="input mb-3" type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
      <button className="button is-primary" onClick={getWeather}>Get Weather</button>
      {weather && (
        <div>
          <p>Location: {weather.location.name}, {weather.location.region}</p>
          <p>Temperature: {weather.current.temp_f}F</p>
          <p>Condition: {weather.current.condition.text}</p>
        </div>
      )}
    </div>
  );
}

export default App;
