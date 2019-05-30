// Mongoose Connection
const mongoose = require('mongoose')
assert = require('assert');

const url = "mongodb://localhost/reddit-db";
mongoose.Promise = global.Promise;
mongoose.connect(
  url,
  { useNewUrlParser: true},
  function(err, db) {
    assert.equal(null, err) 
    console.log('Connected to database')
  }
)
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error'))
mongoose.set('debug', true)

module.exports = mongoose.connection; 