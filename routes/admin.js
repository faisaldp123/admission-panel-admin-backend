const express = require('express');
const router = express.Router();

const { adminLogin, adminLogout, checkAdminAuth, checkAdminSession } = require('../controllers/adminController');

router.post('/login', adminLogin);
router.post('/logout', adminLogout); // new route
router.get('/check-auth', checkAdminAuth);
router.get('/check-admin-session', checkAdminSession);


module.exports = router;