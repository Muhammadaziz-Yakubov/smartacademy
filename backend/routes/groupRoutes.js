const express = require('express');
const router = express.Router();
const Group = require('../models/Group');
const Student = require('../models/Student');

// GET all groups
router.get('/', async (req, res) => {
  try {
    const groups = await Group.find().sort({ createdAt: -1 });
    res.json(groups);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new group
router.post('/', async (req, res) => {
  const { name, teacher, time, days } = req.body;
  const group = new Group({ name, teacher, time, days });

  try {
    const newGroup = await group.save();
    res.status(201).json(newGroup);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a group
router.delete('/:id', async (req, res) => {
  try {
    const group = await Group.findByIdAndDelete(req.params.id);
    if (!group) return res.status(404).json({ message: 'Group not found' });
    
    // Optional: Reset groupId for students in this group
    await Student.updateMany({ groupId: req.params.id }, { groupId: null });
    
    res.json({ message: 'Group deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
