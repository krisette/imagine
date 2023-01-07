import React from 'react';
import { useQuery, gql } from '@apollo/client';

const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');

dayjs.extend(relativeTime);

const GET_UPCOMING_TRIP = gql`
  query {
    getUpcomingTrip {
      start_date
      end_date
    }
  }
`;

export default function UpcomingTrip() {
  const { data, loading, error } = useQuery(GET_UPCOMING_TRIP);

  if (loading) return <div className="component">Loading...</div>;
  if (error) return <div className="component">{error.message}</div>;

  return (
    <div className="component">
      <h1>
        You&apos;re going to Walt Disney World in
        {' '}
        <strong>
          {dayjs(data.getUpcomingTrip.start_date).fromNow(true)}
        </strong>
        !
      </h1>
      <div className="dates">
        Next trip:
        {' '}
        {dayjs(data.getUpcomingTrip.start_date).format('MM/DD/YYYY')}
        {' '}
        -
        {' '}
        {dayjs(data.getUpcomingTrip.end_date).format('MM/DD/YYYY')}
      </div>
    </div>
  );
}
