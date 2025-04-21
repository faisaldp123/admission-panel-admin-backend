const mongoose = require('mongoose');

const mongoURL = 'mongodb://localhost:27017/admission-panel'

mongoose.connect(mongoURL, {
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