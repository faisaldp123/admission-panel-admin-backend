const express = require('express');
const router = express.Router();

const { adminLogin, adminLogout, checkAdminAuth } = require('../controllers/adminController');

router.post('/login', adminLogin);
router.post('/logout', adminLogout); // new route
router.get('/check-auth', checkAdminAuth);


module.exports = router;