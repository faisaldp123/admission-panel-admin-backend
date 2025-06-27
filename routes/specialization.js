const express = require('express');
const router = express.Router();
const Specialization = require('../models/Specialization');


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

module.exports = router;