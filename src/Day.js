import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Day = ({ location }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (location) {
      const apiKey = '4c207c1cf71942bf9d395125241507';
      const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=6&aqi=no&alerts=no`;

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

  if (!weatherData) {
    return <div className='search'>Loading...</div>;
  }

  return (
    <div className="day">
      {weatherData.forecast.forecastday.map((day, index) => (
        <div key={index} className="day1">
          <div className="time">
            <p>Date: {new Date(day.date).toLocaleDateString()}</p>
          </div>
          <div className="cond">
            <h2>{day.day.condition.text}</h2>
          </div>
          <div className="icon">
            <img src={day.day.condition.icon} alt={day.day.condition.text} />
          </div>
          <div className="bot">
            <div className="temp">
              <p>Temp: {day.day.avgtemp_c.toFixed()}°C</p>
            </div>
            <div className="humidity">
              <p>Humidity: {day.day.avghumidity.toFixed()}%</p>
            </div>
            <div className="windspeed">
              <p>Wind Speed: {day.day.maxwind_mph.toFixed()} MPH</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Day;
