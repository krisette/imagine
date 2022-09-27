const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send('u got some trips lol')
});

router.get('/:id', (req, res) => {
  res.status(200).send('u got a trip lol')
});

router.post('/', (req, res) => {
  res.status(201).send('u created a trip lol')
});

router.put('/:id', (req, res) => {
  res.status(200).send('u updated a trip lol')
});

router.delete('/', (req, res) => {
  res.status(200).send('u deleted a trip lol')
});

module.exports = router