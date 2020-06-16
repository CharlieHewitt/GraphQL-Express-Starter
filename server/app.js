const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

// Environment Variables - using dotenv
require('dotenv').config();
const PORT = process.env.PORT;
const CONNECTION_STRING = process.env.CONNECTION_STRING;

const app = express();

// allow cross-origin requests
app.use(cors());

// suppress mongoose deprecation warnings
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

// connect to MongoDB
mongoose.connect(CONNECTION_STRING).catch(error => {
  console.log('connection failed');
});

mongoose.connection.once('open', () => {
  console.log('connected to database');
});

// listen for errors
mongoose.connection.on('error', err => {
  console.log(err);
});

// middleware to handle GraphQL requests at /graphql
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true //  true for testing!
  })
);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT} ...`);
});
