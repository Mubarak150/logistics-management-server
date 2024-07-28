const mongoose = require('mongoose');

const transportContractSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  comments: { type: String }
});

const TransportContract = mongoose.model('TransportContract', transportContractSchema);

module.exports = TransportContract;
