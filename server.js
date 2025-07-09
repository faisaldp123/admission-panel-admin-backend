const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Load environment variables
dotenv.config();

const app = express();

// ✅ Allow-listed Frontend Origins
const allowedOrigins = [
  'http://localhost:3000', // frontend local
  'http://localhost:3001', // backend local
  'https://admission-admin-panel-nextjs.vercel.app' // deployed frontend
];

// ✅ CORS Middleware (must be before routes)
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200); // Preflight
  }

  next();
});

// ✅ Core Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Routes
const formRoutes = require('./routes/form');
const personRoutes = require('./routes/person');
const universityRoutes = require('./routes/universities');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const specializationRoutes = require('./routes/specialization');
const courseRoutes = require('./routes/course');

app.get('/', (req, res) => {
  res.send('Welcome to Admission Panel backend');
});

app.use('/form', formRoutes);
app.use('/person', personRoutes);
app.use('/universities', universityRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/specialization', specializationRoutes);
app.use('/api/course', courseRoutes);

// ✅ Server Listen
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
