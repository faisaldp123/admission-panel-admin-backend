const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection

db.on('connected', () => {
    console.log('Connected to MongoDB Server')
})

db.on('error', (err) => {
    console.log('MongoDB Connection error:', err)
})

db.on('disconnected', () => {
    console.log('MongoDB Disconnected')
})

module.exports = db;