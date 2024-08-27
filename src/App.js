import { useEffect, useState } from 'react';
import axios from 'axios';
import LocationInput from './components/LocationInput';
import WeatherCard from './components/WeatherCard';

function App() {
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  const [weather, setWeather] = useState(null);

  const handleSearch = async (location) => {
    if (location === '') {
      alert('Please enter a location');
      return;
    }
    try {
      const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`);
      setWeather(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      alert('Error fetching weather data. Please try again.');
    }
  }

  const getWeatherByGeo = async (lat, lon) => {
    try {
      const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}`);
      setWeather(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
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
      <h1 className="title has-text-centered mt-4">Weather App</h1>
      <LocationInput onSearch={handleSearch} />
      {weather && <WeatherCard weather={weather} />}
      <p className="has-text-centered mt-4">
        Powered by <a href="https://www.weatherapi.com/" title="Free Weather API">WeatherAPI.com</a>
      </p>
    </div>
  );
}

export default App;
