import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import axios from 'axios';

function App() {
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  const getWeather = async () => {
    const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=London`);
    console.log(response);
  }

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <div className="App">
    </div>
  );
}

export default App;
