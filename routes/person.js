const express = require('express');
const router = express.Router();
const Person = require('../models/Person');

// POST person
router.post('/', async (req, res) => {
    try {
        const newPerson = new Person(req.body);
        const response = await newPerson.save();
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET all persons
router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// PUT update person by ID
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const updatedPerson = await Person.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true
        });

        if (!updatedPerson) {
            return res.status(404).json({ error: 'Person not found' });
        }

        res.status(200).json(updatedPerson);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// DELETE person by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPerson = await Person.findByIdAndDelete(id);

        if (!deletedPerson) {
            return res.status(404).json({ error: 'Person not found' });
        }

        res.status(200).json({ message: 'Person deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
