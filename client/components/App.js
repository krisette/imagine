import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '../stylesheets/_app.scss';
import Home from './Home.js';
import Login from './Login.js';
import NavBar from './NavBar.js';


const App = () => {
  const [loginStatus, setLoginStatus] = useState(false);
  // const [userSession, setUserSession] = useState(true);
  const [user, setUser] = useState();
  const [userID, setUserID] = useState();
  const [allTripsShown, setAllTripsShown] = useState(false);
  
  
  // useEffect(() => {
  //   const checkUserAuth = () => {
  //     fetch('/users/isAuth')
  //       .then(res => res.json())
  //       .then(data => {
  //         if (data.status === 200) {
  //           console.log('hi');
  //         } else {
  //           setLoginStatus(undefined);
  //         }
  //       })
  //       .catch(err => console.log(err));
  //   }
  //   checkUserAuth();
  // }, []);

  if (!loginStatus) {
    return <Login setLoginStatus={setLoginStatus} setUser={setUser} setUserID={setUserID} />
  }

  return (
      <div className="main-container">
        <NavBar user={user} setAllTripsShown={setAllTripsShown} />
        <p></p>
      <Home userID={userID} allTripsShown={allTripsShown} />
      </div>
    )
}

export default App;