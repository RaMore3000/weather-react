import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleLinkClick = () => {
    setIsChecked(false);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <nav>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"/>
      <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      <input
        type="checkbox"
        id="check"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <label htmlFor="check" id="checkbtn"><i className="fa-solid fa-bars"></i></label>
      <label className="logo">WEATHER APP</label>
      <ul>
        <li><Link to="/Your" onClick={handleLinkClick}>Your Location</Link></li>
        <li><Link to="/Current" onClick={handleLinkClick}>Current</Link></li>
        <li><Link to="/Hour" onClick={handleLinkClick}>Hour Section</Link></li>
        <li><Link to="/Day" onClick={handleLinkClick}>Day Section</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;