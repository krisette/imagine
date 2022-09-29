import React, { useState } from 'react';

export default function CreateUser() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [createStatus, setCreateStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { username, password };
    fetch('/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then(() => {
      setCreateStatus('User account created! Please login.');
    }).catch(err => {
      console.log(err);
      setCreateStatus('Error creating user account.');
    });
  }

  return (
    <div className="create-user">
        <h4>create user account</h4>
        <form>
        <div id="username-field">
          <label htmlFor="username"></label>
          <input id="login-input" type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div id="password-field">
          <label htmlFor="password"></label>
          <input id="login-input" type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div id="button-container">
          <label htmlFor="submit"></label>
          <button type="submit" onClick={handleSubmit}>create account</button>
        </div>
        </form>
        <p>{createStatus}</p>
      </div>
  )
}
