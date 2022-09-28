const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session)
// for storing secrets
require('dotenv').config({ path: path.resolve(__dirname, './.env') })
const MONGO_URI = process.env.MONGO_URI;

// start express app!
const app = express();

// body parser & cookie parser
app.use(express.json());
app.use(cookieParser());

// set up mongostore
const mongoDBstore = new MongoDBStore({
  uri: MONGO_URI,
  collection: 'sessions',
})

app.use(session({
  secret: process.env.SECRET,
  name: 'ssid',
  store: mongoDBstore,
  cookie: {
    maxAge: Number(process.env.MAX_AGE), 
    sameSite: false,
    secure: false, // turn on in production
  },
  resave: true,
  saveUninitialized: false,
})
)

// root route handler
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

// declare route handlers
const tripRouter = require(path.join(__dirname, '/routes/trips.js'));
const userRouter = require(path.join(__dirname, '/routes/users.js'));

// route handler for trips
app.use('/trips', tripRouter);
app.use('/users', userRouter);


// connect to db and start server
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'imagine' })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`db connected & server listening on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log('error connecting to db', err);
  });
  
// error handler for unknown route
app.use((req, res) => res.status(404).send("404: No magic here!"));

