import express from 'express';
// const cors = require('cors');
import dotenv from 'dotenv';
// const path = require('path');
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';
import { Request, Response } from 'express';

// load environment variables & create express app
const app = express();
dotenv.config();

// create graphql server
const server = new ApolloServer({ typeDefs, resolvers });

// apply graphql server to express
server.start().then(() => {
  server.applyMiddleware({ app });
});

app.listen({ port: process.env.PORT }, () =>
  console.log(`🚀[server]: ready at http://localhost:${process.env.PORT}${server.graphqlPath}`)
);

// connect to db
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'imagine'})
  .then(() => {
    console.log(`⚡️[server]: db connected`);
  });

// // enable CORS
// app.use(cors());

// // parse json
// app.use(express.json());

// // serve static files
// app.use(express.static(path.join(__dirname, 'build')));

// // serve main page
// app.get('/', (req: Request, res: Response) => {
//   res.send('Express + TypeScript Server');
// });

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