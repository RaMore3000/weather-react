import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Hour = ({ location }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (location) {
      const apiKey = '4c207c1cf71942bf9d395125241507';
      const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=1&aqi=no&alerts=no`;

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
    <div className="hour">
      {weatherData.forecast.forecastday.map((day) => (
        <div key={day.date} className="hour1">
          {day.hour.map((hour, index) => (
            index % 2 === 0 && ( // Display data for every 2-hour interval
              <div key={hour.time_epoch} className="hourly-forecast">
                <div className="time">
                  <p>Time: {new Date(hour.time_epoch * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
                <div className="cond">
                  <h2>{hour.condition.text}</h2>
                </div>
                <div className="icon">
                  <img src={hour.condition.icon} alt={hour.condition.text} />
                </div>
                <div className="bot">
                  <div className="temp">
                    <p>Temp: {hour.temp_c.toFixed()}°C</p>
                  </div>
                  <div className="humidity">
                    <p>Humidity: {hour.humidity.toFixed()}%</p>
                  </div>
                  <div className="windspeed">
                    <p>Wind Speed: {hour.wind_mph.toFixed()} MPH</p>
                  </div>
                </div>
              </div>
            )
          ))}
        </div>
      ))}
    </div>
  );
};

export default Hour;
