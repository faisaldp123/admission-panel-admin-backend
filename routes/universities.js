const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const cloudinary = require('../config/cloudinary'); // ✅ Cloudinary config imported
const Universities = require('../models/Universities');
const mongoose = require('mongoose');
const path = require("path");

let bannerUrl = '';

  

// Multer setup for temporary file storage
const upload = multer({ dest: 'tmp/' });


// POST: create new university with optional banner file upload
router.post('/', upload.single('bannerFile'), async (req, res) => {
  console.log('Incoming POST Body:', req.body);
  try {
    let bannerUrl = req.body.banner || '';
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'universities/banners'
      });
      bannerUrl = result.secure_url;
      fs.unlinkSync(req.file.path);
    }
    const newUniversity = new Universities({
      ...req.body,
      banner: bannerUrl
    });
    const saved = await newUniversity.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('Error creating university:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST: get universities by array of MongoDB _id values
router.post('/by-ids', async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: 'IDs must be a non-empty array' });
    }
    // Convert string IDs to ObjectId
    const objectIds = ids.map(id => mongoose.Types.ObjectId(id));
    const list = await Universities.find({ _id: { $in: objectIds } });
    res.status(200).json(list);
  } catch (err) {
    console.error('Error fetching by IDs:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// GET all universities
router.get('/', async (req, res) => {
    try {
        const data = await Universities.find();
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// PUT update university by ID
router.put('/:id', upload.single('bannerFile'), async (req, res) => {
  try {
      const { id } = req.params;
      const updateData = req.body;

      // If image is uploaded
      if (req.file) {
          // Optional: Upload to Cloudinary or store locally
          const bannerUrl = `uploads/${req.file.originalname}`; // Replace with actual Cloudinary URL if needed
          updateData.banner = bannerUrl;
      }

      const updatedUniversity = await Universities.findByIdAndUpdate(id, updateData, {
          new: true,
          runValidators: true
      });

      if (!updatedUniversity) {
          return res.status(404).json({ error: 'University not found' });
      }

      res.status(200).json(updatedUniversity);
  } catch (error) {
      console.error('Error in PUT /:id', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE university by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log('DELETE Request for ID:', id);

        // Check if ID is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.log('❌ Invalid ObjectId');
            return res.status(400).json({ error: 'Invalid University ID' });
        }

        const deletedUniversity = await Universities.findByIdAndDelete(id);

        if (!deletedUniversity) {
            console.log('❌ University not found');
            return res.status(404).json({ error: 'University not found' });
        }

        console.log('✅ University Deleted:', deletedUniversity);
        res.status(200).json({ message: 'University deleted successfully' });

    } catch (err) {
        console.error('🔥 Server Error:', err.message);
        console.error(err.stack); // FULL error
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;
