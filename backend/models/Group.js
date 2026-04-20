const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  teacher: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  days: {
    type: [String],
    default: []
  }
}, { timestamps: true });

module.exports = mongoose.model('Group', groupSchema);
