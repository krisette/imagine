import React from 'react';
import { useState } from 'react';

const DeleteTrip = () => {
  const [id, setId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`/trips/${id}`, {
      method: 'DELETE',
      headers: { "Content-Type": "application/json" },
    }).then(() => {
      console.log('deleted trip');
    }).catch(err => console.log(err));
  }

  return (
    <div className="delete-trip">
      <h2>Delete Trip</h2>
      <form>
        <label>ID</label>
        <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  )
}

export default DeleteTrip;