const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const OrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
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
      item: {
        type: Schema.Types.ObjectId,
        ref: 'menuitem'
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
      },
      status: {
        type: Boolean,
        default: false
      },
      createAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  amount: {
    type: Number,
    default: 0
  },
  discount: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    default: 0
  },
  custpaid: {
    type: Number,
    default: 0
  },
  payback: {
    type: Number,
    default: 0
  },
  status: {
    type: Boolean,
    default: false
  }
});

module.exports = Order = mongoose.model('order', OrderSchema);
