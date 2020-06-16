// imports
const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

// initialisation
const app = express();

// variables to be set
const PORT = 4000;
const CONNECTION_STRING = '';

// allow cross-origin requests
app.use(cors());

// deprecation warnings
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

// insert connection string here

// connect to mongoDb
mongoose.connect(CONNECTION_STRING);
mongoose.connection.once('open', () => {
  console.log('connected to database');
});

// middleware to handle GraphQL requests, at /graphql endpoint
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true //  for testing
  })
);

// port number + callback for log
app.listen(PORT, () => {
  console.log(`listening on port ${PORT} ...`);
});
