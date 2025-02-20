import { useState } from 'react';
import axios from 'axios';

const weather = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const API_KEY = import.meta.env.VITE_API_KEY;
    const API_URL = import.meta.env.VITE_API_URL;

    const fetchWeather = async () => {
        if (!city) return;

        setLoading(true);
        setError('');

        try {
            const response = await axios.get(API_URL, {
                params: {
                    q: city,
                    appid: API_KEY,
                    units: 'metrics'
                }
            });
            setWeather(response.data);
        } catch (err) {
            setError('City not found  or API error');
            setWeather(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="weather-container">
            <h1>Weather App</h1>
            <div className="search-box">
                <input
                    type="text"
                    placeholder="Enter city name"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button onClick={fetchWeather} disabled={loading}>
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </div>

            {error && <p className="error">{error}</p>}

            {weather && (
                <div className="weather-info">
                    <h2>{weather.name}, {weather.sys.country}</h2>
                    <p>Temperature: {Math.round(weather.main.temp)}°C</p>
                    <p>Feels like: {Math.round(weather.main.feels_like)}°C</p>
                    <p>Weather: {weather.weather[0].description}</p>
                    <p>Humidity: {weather.main.humidity}%</p>
                    <p>Wind Speed: {weather.wind.speed} m/s</p>
                </div>
            )}
        </div>
    );
};

export default weather;