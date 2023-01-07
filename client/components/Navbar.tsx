import React, { useState } from 'react';
import { Bars3Icon } from '@heroicons/react/24/solid';
import '../stylesheets/_navbar.scss';

export default function Navbar() {
  const [showNavbar, setShowNavbar] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          Imagine
        </div>
        <div className="menu-icon">
          <button type="button" onClick={handleShowNavbar}>
            <Bars3Icon />
          </button>
        </div>
        <div className={`nav-elements  ${showNavbar && 'active'}`}>
          <ul>
            <li>
              Home
            </li>
            <li>
              Blog
            </li>
            <li>
              Projects
            </li>
            <li>
              About
            </li>
            <li>
              Contact
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
