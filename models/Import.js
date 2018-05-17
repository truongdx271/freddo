const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ImportSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  billdate: {
    type: Date,
    default: Date.now
  },
  listitems: [{
    item: {
      type: Schema.Types.ObjectId,
      ref: 'importitem'
    },
    name: {
      type: String
    },
    price: {
      type: Number,
      default: 0
    },
    discount: {
      type: Number,
      default: 0
    },
    quantity: {
      type: Number,
      default: 1
    }
  }],
  amount: {
    type: Number
  },
  discount: {
    type: Number
  },
  status: {
    type: Boolean,
    default: false
  }
});

module.exports = Import = mongoose.model('import', ImportSchema);