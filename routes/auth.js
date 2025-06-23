const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getAllUsers } = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/login', loginUser);

// Get all users (Admin)
router.get('/all-users', getAllUsers); // In future, you should secure this route for admins only

module.exports = router;
