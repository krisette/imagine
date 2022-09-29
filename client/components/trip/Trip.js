import React, { useState } from 'react';
import '../../stylesheets/_trips.scss';
import TripDetails from './TripDetails';

export default function Trip( {trip} ) {
  // component hide status state
  const [isDetailShown, setIsDetailShown] = useState(false);

  const dateConverter = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleString('en-US', { timeZone: 'UTC', year: 'numeric', month: '2-digit', day: '2-digit' });
  }

  // prompt user to confirm deletion
  const deletePrompt = (e) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this trip?');
    if (confirmDelete) {
      deleteTrip(e);
    }
  }

  // delete trip from db
  const deleteTrip = (e) => {
    fetch(`/trips/${trip._id}`, {
      method: 'DELETE',
      headers: { "Content-Type": "application/json" },
    }).then(() => {
      console.log('deleted trip');
    }).catch(err => console.log(err));
  }

  const handleClick = () => {
    setIsDetailShown(current => !current);
  }

  /* currently trip-parks is hardcoded to WDW. will eventually change to dynamic fetching from db when all disney resorts are added */
  return (
    <div className="trip-container">
      <div className="trip-row">
      <div className="trip-dates">{dateConverter(trip.start_date)} - {dateConverter(trip.end_date)}</div>
      <div className="trip-parks">Walt Disney World</div>
      <div className="trip-button">
          <button id="details-button" onClick={handleClick}>Details</button>
      </div>
      <div className="trip-delete"><a onClick={deletePrompt}>❌</a></div>
      </div>
      {isDetailShown && <TripDetails key={trip._id} trip={trip} setIsDetailShown={setIsDetailShown}/>}
    </div>
  )
}