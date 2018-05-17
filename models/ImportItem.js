const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ImportItemSchema = new Schema({
  group: {
    type: Schema.Types.ObjectId,
    ref: 'group'
  },
  code: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  unit: {
    type: String
  },
  price: {
    type: Number,
    default: 0
  },
  quantity: {
    type: Number,
    default: 0
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = ImportItem = mongoose.model('importitem', ImportItemSchema);