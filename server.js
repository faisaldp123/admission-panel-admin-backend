const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

dotenv.config(); // Load environment variables

const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  'https://admission-admin-panel-nextjs.vercel.app',
];

app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like Postman or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('CORS policy does not allow this origin'), false);
    }
    return callback(null, true);
  },
  credentials: true,
}));

app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000 // Increase the timeout to 5 seconds or more
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
const formRoutes = require('./routes/form');
const personRoutes = require('./routes/person');
const universityRoutes = require('./routes/universities');
const authRoutes = require('./routes/auth'); // <-- Auth route

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to Admission Panel... How can I help you? We have many courses!');
});

// Mount route files
app.use('/form', formRoutes);
app.use('/person', personRoutes);
app.use('/universities', universityRoutes);
app.use('/api/auth', authRoutes); // <-- Auth route mounted

// Server listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
