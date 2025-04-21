const express = require('express');
const router = express.Router();
const Form = require('../models/Form');
const auth = require('../middleware/authMiddleware');

// POST form with auth
router.post('/', auth, async (req, res) => {
    try {
        const { name, email, phone, dob, degree, specialization, state, city } = req.body;
        const newForm = new Form({ name, email, phone, dob, degree, specialization, state, city });
        await newForm.save();
        res.status(201).json({ message: "Form submitted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong while submitting form" });
    }
});

// GET all forms
router.get('/', async (req, res) => {
    try {
        const data = await Form.find();
        console.log('Forms fetched');
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET form by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const formData = await Form.findById(id);

        if (!formData) {
            return res.status(404).json({ error: 'Form not found' });
        }

        res.status(200).json(formData);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
