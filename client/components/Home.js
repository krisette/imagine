import React from 'react';
import { useEffect, useState } from 'react';
import AllTrips from './trip/AllTrips';
import NewTrip from './Trip/NewTrip';
import logo from '../images/logo.png';
import UpcomingTrips from './trip/UpcomingTrip';

const Home = ( { user, userID, allTripsShown } ) => {
  const [trips, setTrips] = useState(null);
  const [isShown, setIsShown] = useState(false);
  const [upcomingTrip, setUpcomingTrip] = useState({});

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
  }, [upcomingTrip]);

  const handleClick = () => {
    setIsShown(current => !current);
  }

  return (
    <div className="main">
      <img src={logo} alt="Imagine Logo" />
      <UpcomingTrips userID={userID} upcomingTrip={upcomingTrip} />
      {allTripsShown && <AllTrips trips={trips} />}
        <div className="trip-buttons">
          {!isShown && (<button onClick={handleClick}>Add New Trip</button>)}
        </div>
        {isShown && <NewTrip key="newTrip" userID={userID} setIsShown={setIsShown} />}
      </div>
  )
}

export default Home;