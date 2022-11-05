const { Date } = require('mongoose');
const mongoose = require('mongoose');

var schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  time: {
    type: String,
  }
  
   
  
});

const Notedb = mongoose.model('notedb', schema);

module.exports = Notedb;