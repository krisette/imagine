import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Query {
    hello: String
    getAllTrips: [Trip]
    getUpcomingTrip: Trip
  }

  scalar Date

  type Trip {
    id: String
    start_date: Date
    end_date: Date
    resort: String
    hotel: String
    parks: [Park]
    user_id: String
  }

  type Park {
    name: String
    date: String
    reservations: Boolean
    tickets: Boolean
  }
`;

export default typeDefs;
