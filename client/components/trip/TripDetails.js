import React, { useState } from 'react';

export default function TripDetails( {trip} ) {
  const [start_date, setStartDate] = useState(trip.start_date);
  const [end_date, setEndDate] = useState(trip.end_date);
  const [hotel, setHotel] = useState(trip.hotel);
  const [parks, setParks] = useState(trip.parks);



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

  const updateParkDate = (e, id) => {
    const newParkDate = prompt('What is the new park date? (YYYY-MM-DD)');
    // change park date in state to new date
    if (newParkDate) {
      const parkIndex = id;
      const parkName = parks[parkIndex].name;
      const parkDate = newParkDate;
      const parkRes = parks[parkIndex].reservations;
      const parkObj = { name: parkName, date: parkDate, reservations: parkRes };
      setParks(current => {
        const newParks = current.filter(park => park.name !== parkName);
        return [...newParks, parkObj];
      });
    }
  }

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

  // converts invalid date from db to "pick a date"
  const invalidDate = (date) => {
    if (dateConverter(date) === '12/31/1969') {
      return 'Pick a date for';
    } else {
      return dateConverter(date);
    }
  }

  return (
    <div className="trip-details">
      {trip.parks.map((park, index) => {
        return (
          <div className="park-details">
            <div id="park-details-name-and-date"><a onClick={(e) => updateParkDate(e, index)}>{invalidDate(park.date)}</a>: {park.name}</div>
            <div id="park-details-reservation">
              <input type="checkbox" defaultChecked={park.reservations} onChange={handleResCheck} value={index} /> Reservation</div>
          </div>
        )
      })}
      <p>Staying at <strong>{trip.hotel}</strong></p>
      <p><a onClick={updateStartDate}>Update Start Date</a> / <a onClick={updateEndDate}>Update End Date</a> / <a onClick={updateHotel}>Update Hotel</a> <button onClick={handleSubmit}>Submit Changes</button></p> 
    </div>
  )
}