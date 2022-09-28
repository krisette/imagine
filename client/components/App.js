import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import './App.css';
import Home from './Home.js';
import Login from './Login.js';

const App = () => {
  const [loginStatus, setLoginStatus] = useState(false);
  // const [userSession, setUserSession] = useState(true);
  const [user, setUser] = useState();
  const [userID, setUserID] = useState();
  
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
         <h1>iMaGiNaShUN</h1>
      <Home user={user} userID={userID} />
      </div>
    )
}

export default App;