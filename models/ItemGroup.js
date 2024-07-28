const mongoose = require('mongoose');

const itemGroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  comments: {
    type: String,
    required: false,
  },
});

const ItemGroup = mongoose.model('ItemGroup', itemGroupSchema);
module.exports = ItemGroup;
