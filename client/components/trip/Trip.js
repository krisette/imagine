import React, { useState } from 'react';
import '../../stylesheets/_trips.scss';
import TripDetails from './TripDetails';

export default function Trip( {trip} ) {
  // component hide status state
  const [isShown, setIsShown] = useState(false);

  const dateConverter = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString();
  }

  const parkName = (parks) => {
    const parkNames = parks.map(park => park.name);
    return parkNames.join(', ');
  }

  const handleDelete = (e) => {
    fetch(`/trips/${trip._id}`, {
      method: 'DELETE',
      headers: { "Content-Type": "application/json" },
    }).then(() => {
      console.log('deleted trip');
    }).catch(err => console.log(err));
  }

  const handleClick = () => {
    setIsShown(current => !current);
  }
  
  return (
    <div className="trip-container">
      <div className="trip-row">
      <div className="trip-dates">{dateConverter(trip.start_date)} - {dateConverter(trip.end_date)}</div>
      <div className="trip-parks">Walt Disney World</div>
      <div className="trip-button">
          <button onClick={handleClick}>Details</button>
      </div>
      <div className="trip-delete"><a onClick={handleDelete}>❌</a></div>
      </div>
      {isShown && <TripDetails key={trip._id} trip={trip} />}
    </div>
  )
}