import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import axios from 'axios';
import Your from './Your';
import Navbar from './Navbar';
import Current from './Current';
import Hour from './Hour';
import Day from './Day';
import './App.css'; // Assuming you have a CSS file for styling

const App = () => {
  const [location, setLocation] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const searchLocation = () => {
    if (searchValue !== '') {
      setLocation(searchValue);
    }
    setSearchValue('');
  };

  return (
    <BrowserRouter>
      <Navbar />
      <div className="search">
        <input
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          placeholder="Enter Location"
          type="text"
        />
        <button className='mag' onClick={searchLocation}>
          <i className="fas fa-search"></i> {/* Adjusted to use FontAwesome icon properly */}
        </button>
      </div>
      <Routes>
        <Route path="/Your" element={<Your />} />
        <Route path="/Current" element={<Current location={location} />} />
        <Route path="/Hour" element={<Hour location={location} />} />
        <Route path="/Day" element={<Day location={location} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
