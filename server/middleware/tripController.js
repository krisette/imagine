const models = require('../models');

const tripController = {
// create
  createTrip: (req, res, next) => {
    console.log(req.body);
    const { start_date, end_date, hotel, parks } = req.body;
    models.Trip.create({ start_date: start_date, end_date: end_date, hotel: hotel, parks: parks })
      .then(data => next())
      .catch(err => {
        return next({
          log: `tripController.createTrip: ERROR: ${err}`,
          message: { err: 'Could not add trip' },
        });
      });
  },

// read
  getTrips: (req, res, next) => {
    models.Trip.find()
      .then(data => {
        res.locals.trips = data;
        return next();
      })
      .catch(err => {
        return next({
          log: `tripController.getTrips: ERROR: ${err}`,
          message: { err: 'Could not find characters' },
        });
      });
  },

  getOneTrip: (req, res, next) => {
    models.Trip.findById(req.params.id)
      .then(data => {
        res.locals.trip = data;
        return next();
      })
      .catch(err => {
        return next({
          log: `tripController.getOneTrip: ERROR: ${err}`,
          message: { err: 'Could not find character' },
        });
      });
  },

  getUpcomingTrip: (req, res, next) => {
    models.Trip.find({
      start_date: 
        { $gte: new Date() }
      })
      .then(data => {
        res.locals.trip = data;
        console.log(res.locals.trip);
        return next();
      })
      .catch(err => {
        return next({
          log: `tripController.getUpcomingTrip: ERROR: ${err}`,
          message: { err: 'Could not find character' },
        });
      });
  },

// update
  updateTrip: (req, res, next) => {
    const { id } = req.params;
    const { start_date, end_date, hotel, parks } = req.body;
    models.Trip.findByIdAndUpdate(id, { start_date: start_date, end_date: end_date, hotel: hotel, parks: parks })
      .then(data => next())
      .catch(err => {
        return next({
          log: `tripController.updateTrip: ERROR: ${err}`,
          message: { err: 'Could not update trip' },
        });
      });
  },

// delete
  deleteTrip: (req, res, next) => {
    models.Trip.deleteOne({ _id: req.params.id })
      .then(data => next())
      .catch(err => {
        return next({
          log: `tripController.deleteTrip: ERROR: ${err}`,
          message: { err: 'Could not delete trip' },
        });
      });
  },

};

module.exports = tripController;