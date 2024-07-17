import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Current = ({ location }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (location) {
      const apiKey = '4c207c1cf71942bf9d395125241507';
      const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;
      
      axios.get(url)
        .then((response) => {
          setWeatherData(response.data);
          setError('');
        })
        .catch((error) => {
          setWeatherData(null);
          setError('Invalid location. Please try again.');
          console.error('Error fetching weather data:', error);
        });
    }
  }, [location]);

  if (error) {
    return <div className='search'>{error}</div>;
  }

  return (
    <div className="app">
      {error && <p>{error}</p>}
      {weatherData && (
        <div className="container">
          <div className="top">
            <div className="location">
              {weatherData.location ? <p>{weatherData.location.name}</p> : null}
            </div>
            <div className="temp">
              {weatherData.current ? <h1>{weatherData.current.temp_c.toFixed()}°C</h1> : null}
            </div>
            <div className="description">
              {weatherData.current ? <p>{weatherData.current.condition.text}</p> : null}
            </div>
            <div className="temp">
              {weatherData.current ? <img src={weatherData.current.condition.icon} alt="Weather condition" /> : null}
            </div>
          </div>
          <div className="bottom">
            <div className="feels">
              {weatherData.current ? <p className="bold">{weatherData.current.feelslike_c.toFixed()}°C</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {weatherData.current ? <p className="bold">{weatherData.current.humidity.toFixed()}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {weatherData.current ? <p className="bold">{weatherData.current.wind_mph.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Current;
