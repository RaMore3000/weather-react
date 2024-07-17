import React, { useState, useEffect } from "react";
import axios from 'axios';

const Your = () => {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
            },
            (error) => {
                console.error("Error getting geolocation:", error);
            }
        );
    }, []);

    useEffect(() => {
        if (latitude && longitude) {
            const url = `https://api.weatherapi.com/v1/current.json?key=4c207c1cf71942bf9d395125241507&q=${latitude},${longitude}`;
            
            axios
                .get(url)
                .then((response) => {
                    setWeatherData(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching weather data:", error);
                });
        }
    }, [latitude, longitude]);

    return (
        <div className="app">
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

export default Your;
