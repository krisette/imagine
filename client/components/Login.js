import React, { useState } from 'react';
import CreateUser from './CreateUser.js';

const Login = ( {setLoginStatus, setUser, setUserID} ) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginDisplayStatus, setLoginDisplayStatus] = useState('');

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

  return (
    <div className="user-container">
      <div className="login">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Submit</button>
        </form>
        <p>{loginDisplayStatus}</p>
      </div>
      < CreateUser />
    </div>
  )
}

export default Login;