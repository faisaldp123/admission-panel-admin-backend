const mongoose = require('mongoose');

const universitySchema = new mongoose.Schema({
  banner: { type: String, required: false },
  name: { type: String, required: true },
  title: { type: String, required: true },
  fee: { type: Number, required: true },
  ranking: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  location: { type: String, required: true },
  entrance: { type: String, required: true },
  course_duration: { type: String, required: true },
  course: { type: String, required: true },
  specialization: { type: String, required: true },
});

const University = mongoose.model('University', universitySchema);

module.exports = University;