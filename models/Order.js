const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const OrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  table: {
    type: Schema.Types.ObjectId,
    ref: 'table'
  },
  billdate: {
    type: Date,
    default: Date.now
  },
  listitems: [
    {
      code: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      unit: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      discount: {
        type: Number
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  amount: {
    type: Number
  },
  discount: {
    type: Number
  },
  custpaid: {
    type: Number
  },
  payback: {
    type: Number
  },
  status: {
    type: Boolean,
    default: false
  }
});

module.exports = Order = mongoose.model('order', OrderSchema);
