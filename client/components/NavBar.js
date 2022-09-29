import React from 'react';
import "../stylesheets/_navbar.scss";
import { Link } from "react-router-dom";
export default function NavBar( {user} ) {
  return (
		<header className='navbar'>
        <div className='navbar__title navbar__item'>welcome, {user}!</div>
        <div className='navbar__item'>all trips</div>
        <div className='navbar__item'>current wait times</div>
        <div className='navbar__item'>log out</div>        
    </header>
  );
}
