const models = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const sessionController = {

  startSession: (req, res, next) => {
    models.Session.create({ cookieId: res.locals.user._id.id }, (err, session) => {
      if (err) console.log(err);
      return next();
    })
  },

  isLoggedIn: (req, res, next) => {
    models.Session.find({ cookieId: req.cookies.ssid }, (err, session) => {
      if (err) {
        res.status(401).send('Unauthorized');
      } else {
        console.log('succesfully logged in');
        return next();
      }
    })
  },

  verifyToken: (req, res, next) => {
    let token = req.session.token;
    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "unauthorized" });
      }
      req.userId = decoded.id;
      next();
    });
  }
}

module.exports = sessionController;