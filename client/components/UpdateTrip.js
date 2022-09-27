import React from 'react';
import { useState } from 'react';

const UpdateTrip = () => {
  const [start_date, setStartDate] = useState('');
  const [end_date, setEndDate] = useState('');
  const [hotel, setHotel] = useState('');
  const [parks, setParks] = useState('');
  const [id, setId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trip = { start_date, end_date, hotel, parks };

    fetch(`/trips/${id}`, {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(trip)
    }).then(() => {
      console.log('updated trip');
    }).catch(err => console.log(err));
  }

  return (
    <div className="update-trip">
      <h2>Update Trip</h2>
      <form>
        <label>ID</label>
        <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
        <label>Start Date</label>
        <input type="date" value={start_date} onChange={(e) => setStartDate(e.target.value)} />
        <label>End Date</label>
        <input type="date" value={end_date} onChange={(e) => setEndDate(e.target.value)} />
        <label>Hotel</label>
        <input type="text" value={hotel} onChange={(e) => setHotel(e.target.value)} />
        <label>Parks</label>
        <input type="text" value={parks} onChange={(e) => setParks(e.target.value)} />
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  )
}

export default UpdateTrip;