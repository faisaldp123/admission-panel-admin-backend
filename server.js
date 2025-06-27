const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const adminRoutes = require('./routes/admin')

dotenv.config();
require('dotenv').config();

const app = express();

// ✅ CORS FIX (supports both localhost and deployed frontend)
const allowedOrigins = [
  'http://localhost:3001',
  'http://localhost:3002',
  'https://admission-admin-panel-nextjs.vercel.app',
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS Not Allowed'));
    }
  },
  credentials: true, // ✅ Very Important
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

const cookieParser = require('cookie-parser');
app.use(cookieParser());

// ✅ Ensure preflight OPTIONS requests are handled
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Routes
const formRoutes = require('./routes/form');
const personRoutes = require('./routes/person');
const universityRoutes = require('./routes/universities');
const authRoutes = require('./routes/auth');
const specializationRoutes = require('./routes/specialization')
const courseRoutes = require('./routes/course');

app.get('/', (req, res) => {
  res.send('Welcome to Admission Panel backend');
});

app.use('/form', formRoutes);
app.use('/person', personRoutes);
app.use('/universities', universityRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/specialization', specializationRoutes)
app.use('/api/course', courseRoutes);

// ✅ Start server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
