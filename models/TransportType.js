const mongoose = require('mongoose');

const transportsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  comments: {
    type: String,
  },
});

const Transports = mongoose.model('Transports', transportsSchema);
module.exports = Transports;
