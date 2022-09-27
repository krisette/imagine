// require('dotenv').config();
const express = require('express');
const path = require('path');
const tripRouter = require(path.join(__dirname, '/routes/trips.js'));
const mongoose = require('mongoose');

// start express app!
const app = express();

// body parser
app.use(express.json());

// root route handler
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

// route handler for trips
app.use('/trips', tripRouter);

// connect to db and start server
mongoose.connect("mongodb+srv://krisette:EzsNVuFIWAN2r60X@krisette.kg5jhex.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(3000, () => {
      console.log('db connected & server listening on port 3000');
    });
  })
  .catch((err) => {
    console.log('error connecting to db', err);
  });
  

// error handler for unknown route
app.use((req, res) => res.status(404).send("404: No magic here!"));

