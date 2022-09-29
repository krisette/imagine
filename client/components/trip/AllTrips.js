import React from 'react';
import Trip from './Trip';

export default function AllTrips( {trips} ) {
  return (
      <div className="all-trips">
              <h2>All Trips</h2>
                {trips && trips.map((trip, index) => {
                  return (
                    <Trip key={index} trip={trip} />
                  )
                })}
              </div>
  )
}