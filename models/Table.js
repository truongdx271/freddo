const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const TableSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  section: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['0', '1', '2'] // 0 - Empty, 1 - Not Serve yet, 2- Served
  }
});

module.exports = Table = mongoose.model('table', TableSchema);
