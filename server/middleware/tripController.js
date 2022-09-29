const models = require('../models');

const tripController = {
// create
  createTrip: (req, res, next) => {
    console.log(req.body);
    const { start_date, end_date, hotel, parks, user_id } = req.body;
    models.Trip.create({ start_date: start_date, end_date: end_date, hotel: hotel, parks: parks, user_id: user_id })
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
    models.Trip.find( { user_id: req.session.user.id } ).sort( { start_date: 1 } )
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
    models.Trip.findOne({
      start_date: 
        { $gte: new Date() }
      }).sort( { start_date: 1 })
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

// get list of parks from db for checkboxes in new trip form
  getParks: (req, res, next) => {
    models.Park.find()
      .then(data => {
        res.locals.parks = data;
        return next();
      })
      .catch(err => {
        return next({
          log: `tripController.getParks: ERROR: ${err}`,
          message: { err: 'Could not find parks' },
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