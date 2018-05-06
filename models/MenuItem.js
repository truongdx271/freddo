const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const MenuItemSchema = new Schema({
  group: {
    type: Schema.Types.ObjectId,
    ref: 'menugroup'
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
    type: Number
  },
  discount: {
    type: Number
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = MenuItem = mongoose.model('menuitem', MenuItemSchema);
