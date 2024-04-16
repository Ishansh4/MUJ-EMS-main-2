import React, { useState } from 'react';
import './Navbar.css'; // Import the CSS file
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [activeTab, setActiveTab] = useState('home');
  const location = useLocation();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <nav>
      <img className='logo' src="Manipal University1679046981_upload_logo.jpg" alt="img" />
      <ul>
        <li className={activeTab === 'home' ? 'active' : ''} onClick={() => handleTabClick('home')}>
          Report
        </li>
        <input className='serachbar' type="text" placeholder='Search' style={{ borderRadius: 50 }} />
        <li className={activeTab === 'contact' ? 'active' : ''} onClick={() => handleTabClick('contact')} >
          {location.state && location.state.id ? location.state.id : null}
          <img src="3135715.png" alt="pro" className="pro" />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
