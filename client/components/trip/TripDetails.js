import React, { useState } from 'react';

export default function TripDetails( {trip} ) {
  const [start_date, setStartDate] = useState(trip.start_date);
  const [end_date, setEndDate] = useState(trip.end_date);
  const [hotel, setHotel] = useState(trip.hotel);
  const [parks, setParks] = useState(trip.parks);


  const handleResCheck = (e) => {
    if (e.target.checked) {
      // change park reservation status to true
      const parkIndex = e.target.value;
      const parkName = parks[parkIndex].name;
      const parkDate = parks[parkIndex].date;
      const parkObj = { name: parkName, date: parkDate, reservations: true };
      setParks(current => {
        const newParks = current.filter(park => park.name !== parkName);
        return [...newParks, parkObj];
      });
    } else {
      // change park reservation status to false
      const parkIndex = e.target.value;
      const parkName = parks[parkIndex].name;
      const parkDate = parks[parkIndex].date;
      const parkObj = { name: parkName, date: parkDate, reservations: false };
      setParks(current => {
        const newParks = current.filter(park => park.name !== parkName);
        return [...newParks, parkObj];
      });
    }
  }
  
  

  const updateStartDate = (e) => {
    const newStartDate = prompt('What is the new start date? (YYYY-MM-DD)');
    if (newStartDate) {
      const convertedDate = new Date(newStartDate);
      console.log(convertedDate);
      setStartDate(convertedDate);
    }
  }


  const updateEndDate = (e) => {
    const newEndDate = prompt('What is the new end date? (YYYY-MM-DD)');
    if (newEndDate) {
      setEndDate(newEndDate);
    }
  }

  const updateHotel = (e) => {
    const newHotel = prompt('What is the new hotel?');
    if (newHotel) {
      setHotel(newHotel);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatetrip = { start_date, end_date, hotel, parks };

    fetch(`/trips/${trip._id}`, {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatetrip)
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
      {trip.parks.map((park, index) => {
        return (
          <div className="park-details">
            <div id="park-details-name-and-date">{park.name} - {dateConverter(park.date)}</div>
            <div id="park-details-reservation">Reservation:
              <input type="checkbox" defaultChecked={park.reservations} onChange={handleResCheck} value={index} /></div>
          </div>
        )
      })}
      <p>Staying at <strong>{trip.hotel}</strong></p>
      <p><a onClick={updateStartDate}>Update Start Date</a> / <a onClick={updateEndDate}>Update End Date</a> / <a onClick={updateHotel}>Update Hotel</a> <button onClick={handleSubmit}>Submit Changes</button></p> 
    </div>
  )
}