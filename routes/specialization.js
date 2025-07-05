const express = require('express');
const router = express.Router();
const Specialization = require('../models/Specialization');
const { isValidObjectId } = require('mongoose');


const Course = require('../models/Course');
const University = require('../models/University');


router.post('/', async (req, res) => {
    const { name, courseId, universityId, image1, image2, image3, contentHtml } = req.body;

    try {
        const spec = new Specialization({
            name,
            course: courseId,
            university: universityId,
            image1, 
            image2,
            image3, 
            contentHtml
        });

        await spec.save();
        res.status(201).json(spec);
    } catch (err) {
        res.status(404).json ({ error: err.message });
    }
});


router.get('/', async (req, res) => {
    const { courseId, universityId } = req.query;
    const filter = {};

    if (courseId) filter.course = courseId;
    if (universityId) filter.university = universityId;

    const spec = await Specialization.find(filter)
        .populate('course')
        .populate('university');

        res.json(spec);
});

// Get specialization by ID
router.get('/:id', async (req, res) => {
  try {
    const spec = await Specialization.findById(req.params.id);
    console.log('Returning Specialization:', spec);
    if (!spec) return res.status(404).json({ error: 'Specialization not found' });
    res.json(spec);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Update Specialization by Id

router.put('/:id', async (req, res) => {
  const { id } = req.params;

  // ✅ Check for valid MongoDB ObjectId
  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  try {
    // ✅ Try to update specialization
    const updateSpec = await Specialization.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updateSpec) {
      return res.status(404).json({ error: 'Specialization not found' });
    }

    res.json({ message: 'Specialization updated successfully', data: updateSpec });
  } catch (err) {
    console.error('❌ Error updating specialization:', err.message);
    res.status(500).json({ error: err.message });
  }
});

//Delete Specialization by Id

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  console.log('🚨 Incoming ID:', id);
  console.log('✅ Is valid ObjectId:', isValidObjectId(id));

  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  try {
    const check = await Specialization.findById(id);
    console.log('🔍 Found in DB:', check);

    if (!check) {
      return res.status(404).json({ error: 'Specialization not found in DB' });
    }

    const deleted = await Specialization.findByIdAndDelete(id);
    res.json({ message: 'Specialization Deleted Successfully', deleted });
  } catch (err) {
    console.error('❌ Error:', err.message);
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;