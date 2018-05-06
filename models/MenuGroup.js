const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MenuGroupSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = MenuGroup = mongoose.model('menugroup', MenuGroupSchema);
