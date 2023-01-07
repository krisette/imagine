import React from 'react';
import { useQuery, gql } from '@apollo/client';

const dayjs = require('dayjs');

const GET_ALL_TRIPS = gql`
  query {
    getAllTrips {
      start_date
      end_date
      resort
    }
  }
`;

export default function AllTrips() {
  const { data, loading, error } = useQuery(GET_ALL_TRIPS);

  if (loading) return <div className="component">Loading...</div>;
  if (error) return <div className="component">{error.message}</div>;

  return (
    <div className="component">
      <table>
        <thead>
          <tr>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Resort</th>
            <th>
              <span className="sr-only">Edit</span>
            </th>
            <th>
              <span className="sr-only">Delete</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.getAllTrips.map((trip: any) => (
            <tr key={trip.start_date}>
              <td>{dayjs(trip.start_date).format('MM/DD/YYYY')}</td>
              <td>{dayjs(trip.end_date).format('MM/DD/YYYY')}</td>
              <td>{trip.resort}</td>
              <td>
                <button type="button">Edit</button>
              </td>
              <td>
                <button type="button">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
