/* eslint-disable no-console */
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import passport from 'passport';
import express, { Request, Response } from 'express';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './typeDefs';
import resolvers from './resolvers';
import authRouter from './routes/auth';

dotenv.config();
const mongoose = require('mongoose');

const app = express();
app.use(cors());

const session = require('express-session');
const MongoStore = require('connect-mongo');

const startApolloServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  // connect to db before starting server
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'imagine',
  })
    .then(() => {
      console.log('⚡️[server]: db connected');
    })
    .catch((err: Error) => {
      console.log('⚡️[server]: error connecting to db: ', err);
    });

  server.applyMiddleware({ app });

  app.listen({ port: process.env.PORT }, () => console.log(`🚀[server]: ready at http://localhost:${process.env.PORT}${server.graphqlPath}`));
};

startApolloServer();

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    mongoUrl: process.env.MONGO_URI,
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
  },
}));
app.use(passport.authenticate('session'));

app.use('/', authRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('hello world');
});

// connect to db

// // enable CORS
//

// // parse json
// app.use(express.json());

// // serve static files
// app.use(express.static(path.join(__dirname, 'build')));

// // serve main page

// // connect to db and start server
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//     useUnifiedTopology: true,
//     dbName: 'imagine' })
//   .then(() => {
//     app.listen(process.env.PORT, () => {
//       console.log(`⚡️[server]: db connected & server listening on port ${process.env.PORT}`);
//     });
//   })
//   .catch((err: Error) => {
//     console.log('error connecting to db', err);
//   });

// error handler for unknown route
// app.use((req: Request, res: Response) => res.status(404).send("404: No magic here!"));
