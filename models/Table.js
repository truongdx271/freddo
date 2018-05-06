const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const TableSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    default: false
  }
});

module.exports = Table = mongoose.model('table', TableSchema);
