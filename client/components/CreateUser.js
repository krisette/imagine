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
        <h2>Create User</h2>
        <form>
          <label>Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" onClick={handleSubmit}>Submit</button>
        </form>
        <p>{createStatus}</p>
      </div>
  )
}
