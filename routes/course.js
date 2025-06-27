// routes/course.js
const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

// ✅ GET course by slug (like "mba", "bba")
router.get('/slug/:slug', async (req, res) => {
  const { slug } = req.params;
  try {
    const course = await Course.findOne({ slug });
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
