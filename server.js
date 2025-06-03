const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

dotenv.config();

const app = express();

// ✅ Allow specific frontend origins
const allowedOrigins = [
  'http://localhost:3000',
  'https://admission-admin-panel-nextjs.vercel.app',
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow server-to-server / curl
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // ✅ required for cookies & auth headers
}));

app.use(bodyParser.json());

// ✅ MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// ✅ Routes
const formRoutes = require('./routes/form');
const personRoutes = require('./routes/person');
const universityRoutes = require('./routes/universities');
const authRoutes = require('./routes/auth');

app.use('/form', formRoutes);
app.use('/person', personRoutes);
app.use('/universities', universityRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to Admission Panel... How can I help you? We have many courses!');
});

// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
