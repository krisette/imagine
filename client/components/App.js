import React from 'react';
import { useEffect, useState } from 'react';
import NewTrip from './NewTrip';
import UpdateTrip from './UpdateTrip';
import DeleteTrip from './DeleteTrip';

const App = () => {
  const [trips, setTrips] = useState(null);

  useEffect(() => {
    const getTrips = () => {
      fetch('/trips')
        .then(res => res.json())
        .then(data => {
          setTrips(data);
        })
        .catch(err => console.log(err));
    }
    getTrips();
  }, []);

  return (
    <div className="main">
      <h1>iMaGiNaShUN</h1>
      <div className="Trips">
        <h2>All Trips</h2>
          {trips && trips.map(trip => {
            return (
              <div className="trip">
                <p>{trip.start_date}</p>
                <p>{trip.end_date}</p>
                <p>{trip.hotel}</p>
                <p>{trip.parks}</p>
              </div>
            )
          })}
        </div>
        <NewTrip />
        <UpdateTrip />
        <DeleteTrip />
      </div>
  )
}

export default App;