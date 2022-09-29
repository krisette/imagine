import React, { useEffect } from 'react';
import { useState } from 'react';

const NewTrip = ({ userID, setIsShown }) => {
  const [start_date, setStartDate] = useState('');
  const [end_date, setEndDate] = useState('');
  const [hotel, setHotel] = useState('');
  const [parksData, setParksData] = useState('');
  const [parks, setParks] = useState([]);

  // adds new trip to db
  const handleSubmit = (e) => {
    e.preventDefault();
    const trip = { start_date, end_date, hotel, parks, user_id: userID };
    setIsShown(false);

    fetch('/trips', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(trip)
    }).then(() => {
      console.log('new trip added');
      setIsShown(false);
    }).catch(err => console.log(err));
  }

  // fetch list of parks from api and store in state
  useEffect(() => {
    fetch('/trips/parks')
      .then(res => res.json())
      .then(data => {
        setParksData(data);
      })
      .catch(err => console.log(err));
  }, []);

  // handle parkscheckbox change
  const handleParkCheck = (e) => {
    const parkIndex = e.target.value;
    const parkName = parksData[parkIndex].name;
    // if checkbox is checked, add park object to parks array
    if (e.target.checked) {
      const parkObj = { name: parkName, date: '', reservations: false };
      setParks(current => {
        return [...current, parkObj];
      });
      }
    else {
      // if checkbox is unchecked, remove park object from parks array
      setParks(current => current.filter(park => park.name !== parkName));
    }
  }

  // TODO: convert all date handlers to moment.js or luxon
  // disabling below for demo
  /* const startDateValidator = (value) => {
    const today = new Date().toJSON().slice(0, 10)
    if (value < today) {
      return alert('You cannot travel back in time! Please pick a date in the future.');
    }
    else {
      setStartDate(value);
    }
  }

  const endDateValidator = (value) => {
    if (value < start_date) {
      return alert('You cannot end your trip before it begins!\nPlease pick a new end date.');
    }
    else {
      setEndDate(value);
    }
  } */

  return (
    <div className="new-trip">
      <form onSubmit={handleSubmit}>
        <div className="new-date-range">
          <div id="start-date">
            <label htmlFor="startdate">Start Date </label>
            <input type="date" value={start_date} onChange={(e) => setStartDate(e.target.value)} required />
          </div>
          <div id="end-date">
            <label htmlFor="enddate">End Date </label>
            <input type="date" value={end_date} onChange={(e) => setEndDate(e.target.value)} required />
          </div>
        </div>
      <div className="new-trip-2nd-row">
        <div className="new-parks">
        <label htmlFor="parks">Parks:</label> <small>(Select all that apply)</small>
        {parksData && parksData.map((parkObj, index) => {
            return (
              <div key={index} className="checkboxWithLabel">
                  <input type="checkbox" className="park-checkbox" value={index} onChange={handleParkCheck}></input> 
                <span className="checkboxLabel">{parkObj.name}</span>
              </div>
            );
          })}
        </div>

        <div className="new-hotel">
          <div id="new-hotel-label-container">
            <label>Hotel </label>
          </div>
          <div id="new-hotel-input-container">
          <input type="text" value={hotel} onChange={(e) => setHotel(e.target.value)} required />
          </div>
        </div>
        </div>
        <div className="add-trip-button-container">  
          <button type="submit">Submit New Trip</button>
        </div>
      </form>
    </div>
  )
}

export default NewTrip;