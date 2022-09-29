const express = require('express');
const router = express.Router();
const tripController = require('../middleware/tripController');




router.get('/parks',
tripController.getParks,
(req, res) => {
  return res.status(200).json(res.locals.parks);
}
);

router.get('/upcoming/:id',
tripController.getUpcomingTrip,
(req, res) => {
  res.status(200).json(res.locals.trip)
});

router.get('/:id',
tripController.getTrips,
(req, res) => {
  res.status(200).send(res.locals.trips)
});

router.get('/',
  tripController.getTrips,
   (req, res) => {
  res.status(200).json(res.locals.trips)
});

router.post('/',
  tripController.createTrip,
  (req, res) => {
  res.status(201);
});

router.put('/:id',
  tripController.updateTrip,
  (req, res) => {
  res.status(200);
});

router.delete('/:id',
  tripController.deleteTrip,
  (req, res) => {
  res.status(200);
});

module.exports = router