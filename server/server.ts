const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
import { Request, Response } from 'express';

// load environment variables
dotenv.config();

// enable CORS
app.use(cors());

// parse json
app.use(express.json());

// serve static files
app.use(express.static(path.join(__dirname, 'build')));

// serve main page
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

// connect to db and start server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'imagine' })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`⚡️[server]: db connected & server listening on port ${process.env.PORT}`);
    });
  })
  .catch((err: Error) => {
    console.log('error connecting to db', err);
  });
  
// error handler for unknown route
app.use((req: Request, res: Response) => res.status(404).send("404: No magic here!"));