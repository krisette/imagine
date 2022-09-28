const models = require('../models');
const bcrypt = require('bcrypt');


const userController = {

  // create new user
  createUser: (req, res, next) => {
    const { username, password } = req.body;
    // console.log(req.body);
    // console.log('is createUser working?')
    if (username === '' || password === '') {
      return next({
        log: 'userController.createUser: ERROR: Missing username or password',
        message: { err: 'Missing username or password' },
      });
    }

    // hash password asynchronously before storing in db
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        return next({
          log: `userController.createUser: ERROR: Error hashing password: ${err}`,
          message: { err: 'Error hashing password' },
        });
      }

      // store hashed password in db with new user
      models.User.create({ username: username, password: hash })
        .then(data => {
          res.locals.userID = data._id;
          let token = jwt.sign({ id: res.locals.userID }, process.env.JWT_SECRET, {
            expiresIn: 86400
          });
          req.session.token = token;
          return next()})
        .catch(err => {
          return next({
            log: `userController.createUser: ERROR: Error creating user: ${err}`,
            message: { err: 'Error creating user' },
          });
        });
    });
  },

  // verify user logging in
  verifyUser: (req, res, next) => {
    console.log(`user is logging in with ${req.body}`)
    const { username, password } = req.body;

    // if no username or password, return error
    if (!username || !password) {
      return next({
        log: 'userController.verifyUser: ERROR: Missing username or password',
        message: { err: 'Missing username or password' },
      });
    }

    // hash password
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        return next({
          log: `userController.verifyUser: ERROR: Error hashing password: ${err}`,
          message: { err: 'Error hashing password' },
        });
      }
      console.log('successfully hashed')
      // find user in db
      models.User.findOne({ username: username })
        .then(data => {
          // compare hashed password with password in db
          bcrypt.compare(password, data.password, (err, result) => {
            // if other error, return error
            if (err) {
              return next({
                log: `userController.verifyUser: ERROR: Error comparing passwords: ${err}`,
                message: { err: 'Error comparing passwords' },
              });
            }
            // if passwords match, store user id as userSession
            if (result) {
              console.log('successfully verified user')
              console.log(data);
              const userSession = { id: data._id };
              console.log(req.session);
              req.session.user = userSession;
              res.locals.userID = data._id;
              return next();
            } else {
              // if passwords don't match, return error
              return next({
                log: 'userController.verifyUser: ERROR: Incorrect password',
                message: { err: 'Incorrect password' },
              });
            }
          });
        })
        // if user not found, return error
        .catch(err => {
          return next({
            log: `userController.verifyUser: ERROR: Error finding user: ${err}`,
            message: { err: 'Error finding user' },
          });
        });
    });
  }
}

module.exports = userController;