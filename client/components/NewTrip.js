import React from 'react';
import { useState } from 'react';

const NewTrip = () => {
  const [start_date, setStartDate] = useState('');
  const [end_date, setEndDate] = useState('');
  const [hotel, setHotel] = useState('');
  const [parks, setParks] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trip = { start_date, end_date, hotel, parks };

    fetch('/trips', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(trip)
    }).then(() => {
      console.log('new trip added');
    }).catch(err => console.log(err));
  }

  return (
    <div className="new-trip">
      <h2>New Trip</h2>
      <form>
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

export default NewTrip;