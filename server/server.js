const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
// for storing secrets
require('dotenv').config({ path: path.resolve(__dirname, './.env') })

// start express app!
const app = express();

// body parser
app.use(express.json());

// root route handler
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

// declare route handlers
const tripRouter = require(path.join(__dirname, '/routes/trips.js'));

// route handler for trips
app.use('/trips', tripRouter);

// connect to db and start server
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
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

