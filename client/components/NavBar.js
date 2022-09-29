import React from 'react';
import "../stylesheets/_navbar.scss";
// import { Link } from "react-router-dom";
export default function NavBar( {user, setAllTripsShown} ) {

  const showAllTrips = () => {
    setAllTripsShown(current => !current);
  }

  const logOut = () => {
    window.location.reload();
  }

  return (
		<header className='navbar'>
        <div className='navbar__title navbar__item'>welcome, {user}!</div>
        <div className='navbar__item'><a onClick={showAllTrips}>all trips</a></div>
        <div className='navbar__item'>current wait times</div>
        <div className='navbar__item'><a onClick={logOut}>log out</a></div>        
    </header>
  );
}
