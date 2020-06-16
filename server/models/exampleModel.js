const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// No id required as mongoDB handles generating them
const exampleModel = new Schema({
  name: String
});

module.exports = mongoose.model('ExampleModel', exampleModel);
