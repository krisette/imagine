const express = require('express');
const router = express.Router();
const userController = require('../middleware/userController');
// const sessionController = require('../middleware/sessionController');
// const cookieController = require('../middleware/cookieController');

router.get('/isAuth', (req, res) => {
  if (req.session.user) {
    return res.json(req.session.user);
  } else {
    return res.status(401).json('unauthorized');
  }
});

router.post('/signup',
  userController.createUser,
  (req, res) => {
  console.log('signed up');
  return res.status(201);
});

router.post('/login',
  userController.verifyUser,
  (req, res) => {
    console.log('logged in');
    return res.status(200).json({ status: 200, id: res.locals.userID });
});

router.delete('/logout', (req, res) => {
  req.session.destroy((error) => {
    if (error) throw error;
    res.clearCookie('session-id') // cleaning the cookies from the user session
    res.status(200).send('Logout Success');
  });
});

module.exports = router;