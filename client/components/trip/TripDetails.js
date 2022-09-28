import React, { useState } from 'react';

export default function TripDetails( {trip} ) {
  const [start_date, setStartDate] = useState('');
  const [end_date, setEndDate] = useState('');
  const [hotel, setHotel] = useState('');
  const [parks, setParks] = useState('');

  const handleResCheck = (e) => {
    if (e.target.checked) {
      // change park reservation status to true
    } else {
      // change park reservation status to false
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const trip = { start_date, end_date, hotel, parks };

    fetch(`/trips/${trip._id}`, {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(trip)
    }).then(() => {
      console.log('updated trip');
    }).catch(err => console.log(err));
  }

  const dateConverter = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString();
  }

  return (
    <div className="trip-details">
      {trip.parks.map(park => {
        return (
          <div className="park-details">
            <div id="park-details-name-and-date">{park.name} - {dateConverter(park.date)}</div>
            <div id="park-details-reservation">Reservation:
              <input type="checkbox" checked={park.reservations} onChange={handleResCheck} /></div>
          </div>
        )
      })}
      <p>Staying at <strong>{trip.hotel}</strong></p>
    </div>
  )
}