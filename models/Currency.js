const mongoose = require('mongoose');

const currencySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
});

const Currency = mongoose.model('Currency', currencySchema);
module.exports = Currency;



