const mongoose = require('mongoose');

const universitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

// ✅ Fix: Check if already defined before compiling again
module.exports = mongoose.models.University || mongoose.model('University', universitySchema);
