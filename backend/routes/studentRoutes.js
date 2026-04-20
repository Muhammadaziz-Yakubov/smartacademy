const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// GET all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new student
router.post('/', async (req, res) => {
  const { name, phone, groupId } = req.body;
  const student = new Student({
    name,
    phone,
    groupId: groupId || null,
    paid: false,
    attendance: []
  });

  try {
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a student
router.delete('/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json({ message: 'Student deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT toggle payment status
router.put('/:id/payment', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    
    student.paid = !student.paid;
    const updatedStudent = await student.save();
    res.json(updatedStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT add/update attendance
// This will handle "bor" or "yo'q" actions
router.put('/:id/attendance', async (req, res) => {
  const { status } = req.body;
  console.log('Attendance PUT Request:', { id: req.params.id, status });
  
  if (!status) {
    return res.status(400).json({ message: 'Status is required' });
  }

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const existingRecord = await Student.findOne({
      _id: req.params.id,
      "attendance.date": { $gte: today, $lt: tomorrow }
    });

    if (existingRecord) {
      await Student.updateOne(
        { _id: req.params.id, "attendance.date": { $gte: today, $lt: tomorrow } },
        { $set: { "attendance.$.status": status } }
      );
    } else {
      await Student.updateOne(
        { _id: req.params.id },
        { $push: { 
            attendance: { 
              date: new Date(), 
              status, 
              arrivalTime: status === 'bor' ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''
            } 
          } 
        }
      );
    }

    const updatedStudent = await Student.findById(req.params.id);
    res.json(updatedStudent);
  } catch (err) {
    console.error('Mark Attendance ERROR:', err);
    res.status(400).json({ message: err.message });
  }
});

// PUT update student group
router.put('/:id/group', async (req, res) => {
  const { groupId } = req.body;
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    
    student.groupId = groupId || null;
    const updatedStudent = await student.save();
    res.json(updatedStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
