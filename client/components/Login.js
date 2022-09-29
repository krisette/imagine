import React, { useState } from 'react';
import CreateUser from './CreateUser.js';
import '../stylesheets/_login.scss';
import logo from '../images/logo.png';

const Login = ( {setLoginStatus, setUser, setUserID} ) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginDisplayStatus, setLoginDisplayStatus] = useState('');
  const [isShown, setIsShown] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  }

  const handleBlur = () => {
    setIsFocused(false);
  }

  const handleSubmit = e => {
    e.preventDefault();
    const user = { username, password };
    fetch('/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if (data.status === 200) {
        console.log(data);
        setLoginStatus(true);
        setUser(username);
        setUserID(data.id);
        // redirect to home page

      }
    })
    .catch(err => {
      if (err.status === 401) {
        setLoginDisplayStatus('Invalid username or password.');
      }
    });
  }

  const handleClick = () => {
    setIsShown(current => !current);
  }

  return (
    <div className="user-container">
      <div className="login">
        <div id="login-title">
          <img src={logo} alt="Imagine Logo" />
        </div>
        <form onSubmit={handleSubmit}>
          <div id="username-field">
            <label htmlFor="username" className="placeholder">Username</label>
            <input id="login-input" type="text" placeholder=" " value={username} onChange={(e) => { setUsername(e.target.value)}} required />
          </div>
          <div id="password-field">
            <label htmlFor="password">Password</label>
            <input id="login-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div id="button-container">
            <label htmlFor="submit"></label>
          <button id="login-button" type="submit">Log In</button>
          </div>
        </form>
      </div>
      <div className="sign-up">Don't have an account? <a onClick={handleClick}>Create one</a></div>
      {isShown && <CreateUser key="create-user" />}
    </div>
  )
}

export default Login;