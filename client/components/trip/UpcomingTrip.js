import React from 'react';

export default function UpcomingTrip( {upcomingTrip} ) {

  const dateConverter = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleString('en-US', { timeZone: 'UTC', year: 'numeric', month: '2-digit', day: '2-digit' });
  }

  const differenceInDays = (date) => {
    const today = new Date();
    const tripDate = new Date(date);
    const difference = tripDate - today;
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    return days;
  }

  const daysUntilTrip = differenceInDays(upcomingTrip.start_date);

  return (
    <div className="upcoming-trip">
          <div className="upcoming-recent-trip">
            <p id="wow-a-trip">You're going to Walt Disney World <span id="wow-a-trip-numbers">
              {daysUntilTrip === 0 ? 'TODAY!' : 'in '}
              {daysUntilTrip > 1 ? `${daysUntilTrip} days!` : null}{daysUntilTrip === 1 ? '1 day!' : null}</span></p>
            <p>Next vacation: {dateConverter(upcomingTrip.start_date)} - {dateConverter(upcomingTrip.end_date)}</p>
          </div>
    </div>
  )
}