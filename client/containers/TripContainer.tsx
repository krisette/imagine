import React from 'react';
import AllTrips from '../components/AllTrips';
import UpcomingTrip from '../components/UpcomingTrip';

export default function TripContainer() {
  return (
    <div>
      <UpcomingTrip />
      <AllTrips />
    </div>
  );
}
