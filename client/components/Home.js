import React from 'react';
import { useEffect, useState } from 'react';
import Trip from './Trip/Trip';
import NewTrip from './Trip/NewTrip';

const Home = ( { user, userID } ) => {
  const [trips, setTrips] = useState(null);
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    const getTrips = () => {
      fetch(`/trips/${userID}`)
        .then(res => res.json())
        .then(data => {
          setTrips(data);
        })
        .catch(err => console.log(err));
    }
    getTrips();
  }, [trips]);

  const handleClick = () => {
    setIsShown(current => !current);
  }

  return (
    <div className="main">
      <p>WeLcOmE HoMe, {user} !!!</p>
      <div className="Trips">
        <h2>All Trips</h2>
          {trips && trips.map((trip, index) => {
            return (
              <Trip key={index} trip={trip} />
            )
          })}
        </div>
        <div className="trip-buttons">
          <button onClick={handleClick}>Add New Trip</button>
        </div>
        {isShown && <NewTrip key="newTrip" userID={userID} setIsShown={setIsShown} />}
      </div>
  )
}

export default Home;