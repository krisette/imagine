import React from 'react';
import { useEffect, useState } from 'react';
import AllTrips from './trip/AllTrips';
import NewTrip from './Trip/NewTrip';
import logo from '../images/logo.png';
import UpcomingTrip from './trip/UpcomingTrip';

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
      <img src={logo} alt="Imagine Logo" />
      <UpcomingTrip userID={userID} />
      <AllTrips trips={trips} />
        <div className="trip-buttons">
          <button onClick={handleClick}>Add New Trip</button>
        </div>
        {isShown && <NewTrip key="newTrip" userID={userID} setIsShown={setIsShown} />}
      </div>
  )
}

export default Home;