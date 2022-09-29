import React, { useState } from 'react';
import { DateTime } from "luxon";

export default function TripDetails( {trip, setIsDetailShown} ) {
  // declare all state variables needed
  const [start_date, setStartDate] = useState(trip.start_date);
  const [end_date, setEndDate] = useState(trip.end_date);
  const [hotel, setHotel] = useState(trip.hotel);
  const [parks, setParks] = useState(trip.parks);

  // update start date
  const updateStartDate = (e) => {
    const newStartDate = prompt('What is the new start date? (YYYY-MM-DD)');
    if (newStartDate) {
      const convertedDate = new Date.UTC(newStartDate);
      console.log(convertedDate);
      setStartDate(convertedDate);
    }
  }

  // update end date
  const updateEndDate = (e) => {
    const newEndDate = prompt('What is the new end date? (YYYY-MM-DD)');
    if (newEndDate) {
      setEndDate(newEndDate);
    }
  }

  // update hotel
  const updateHotel = (e) => {
    const newHotel = prompt('What is the new hotel?');
    if (newHotel) {
      setHotel(newHotel);
    }
  }

  // update specific park dates
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

  // update whether or not you made park reservations
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
  
  // submits updated trip to database
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsDetailShown(false);
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
    return newDate.toLocaleString('en-US', { timeZone: 'UTC', year: 'numeric', month: '2-digit', day: '2-digit' });
  }

  const adrCalculator = (date) => {
    let result = DateTime.fromISO(date).minus({days: 60}).toLocaleString('en-US', { timeZone: 'UTC', year: 'numeric', month: '2-digit', day: '2-digit' });
    return result;
  }

  // converts invalid date from db to "pick a date"
  const invalidDate = (date) => {
    if (dateConverter(date) === '01/01/1970') {
      return 'Pick a date for';
    } else {
      return dateConverter(date);
    }
  }

  return (
    <div className="trip-details">
      {trip.parks.map((park, index) => {
        return (
          <div className="park-details" key={index}>
            <div id="park-details-name-and-date"><a onClick={(e) => updateParkDate(e, index)}>{invalidDate(park.date)}</a>: {park.name}</div>
            <div id="park-details-reservation">
              <input className="res-checkbox" type="checkbox" defaultChecked={park.reservations} onChange={handleResCheck} value={index} /> Reservation</div>
          </div>
        )
      })}
      <div id="trip-details-hotel"><p>Staying at <strong>{trip.hotel}</strong></p></div>
      <div id="adr-reminder"><p>You can begin to make <a href="https://disneyworld.disney.go.com/dining/#/reservations-accepted/" target="_blank">Advanced Dining Reservations</a> on {adrCalculator(trip.start_date)}.</p></div>
      <div id="trip-details-change-menu"><a onClick={updateStartDate}>Update Start Date</a>&nbsp;/&nbsp;<a onClick={updateEndDate}>Update End Date</a>&nbsp;/&nbsp;<a onClick={updateHotel}>Update Hotel</a></div>
      <div id="submit-changes-container"><button onClick={handleSubmit}>Submit Changes</button></div> 
    </div>
  )
}