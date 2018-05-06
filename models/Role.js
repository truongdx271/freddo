const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  routes: [
    {
      link: {
        type: String
      },
      method: {
        type: String,
        default: 'GET'
      }
    }
  ],
  permissions: [
    {
      type: String
    }
  ],
  description: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Role = mongoose.model('role', RoleSchema);
