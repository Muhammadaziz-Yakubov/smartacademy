const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    default: 'bor'
  },
  arrivalTime: {
    type: String,
    default: ''
  },
  leaveTime: {
    type: String,
    default: ''
  }
});

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  paid: {
    type: Boolean,
    default: false
  },
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    default: null
  },
  attendance: [attendanceSchema]
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
