import React from 'react';
import AllTrips from '../components/AllTrips';
import UpcomingTrip from '../components/UpcomingTrip';
import '../stylesheets/_trips.scss';

export default function TripContainer() {
  return (
    <div className="container">
      <UpcomingTrip />
      <AllTrips />
    </div>
  );
}
