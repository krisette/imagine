import { Trip } from './models';

export const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    getAllTrips: async () => {
      const trips = await Trip.find();
      return trips;
    },
    getUpcomingTrip: async () => {
      const trip = await Trip.findOne({
      start_date: 
        { $gte: new Date() },
      }).sort( { start_date: 1 })
      return trip;
    }
  },
};