import React, { useState, useEffect } from 'react';

export default function UpcomingTrip( {userID} ) {
  const [upcomingTrip, setUpcomingTrip] = useState({});
  
  useEffect(() => {
    const getUpcomingTrip = () => {
      fetch(`/trips/upcoming/${userID}`)
        .then(res => res.json())
        .then(data => {
          setUpcomingTrip(data);
        })
        .catch(err => console.log(err));
    }
    getUpcomingTrip();
  }, []);

  const dateConverter = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString();
  }

  const differenceInDays = (date) => {
    const today = new Date();
    const tripDate = new Date(date);
    const difference = tripDate - today;
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    return days;
  }

  const convertedStartDate = dateConverter(upcomingTrip.start_date);

  const daysUntilTrip = differenceInDays(upcomingTrip.start_date);

  return (
    <div className="upcoming-trip">
          <div className="upcoming-recent-trip">
            <p id="wow-a-trip">You have a trip to Walt Disney World in <span id="wow-a-trip-numbers">{daysUntilTrip} day{daysUntilTrip > 1 ? 's' : null}!</span></p>
            <p>Next vacation: {convertedStartDate} - {dateConverter(upcomingTrip.end_date)}</p>
          </div>
    </div>
  )
}