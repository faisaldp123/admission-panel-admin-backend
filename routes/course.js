// routes/course.js
const express = require('express');
const router = express.Router();
const Course = require('../models/Course');


// ✅ POST: Add new course
router.post('/', async (req, res) => {
  const { name, slug } = req.body;

  if (!name || !slug) {
    return res.status(400).json({ error: 'Name and slug are required' });
  }

  try {
    const existing = await Course.findOne({ slug });
    if (existing) {
      return res.status(400).json({ error: 'Course with this slug already exists' });
    }

    const course = new Course({ name, slug });
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find(); // get all
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET course by slug
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
