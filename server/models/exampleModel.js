const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// id not needed in model
const exampleModel = new Schema({
  name: String
});

module.exports = mongoose.model('ExampleModel', exampleModel);
