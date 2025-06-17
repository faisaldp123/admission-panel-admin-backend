const jwt = require('jsonwebtoken');

exports.adminLogin = (req, res) => {
  const { email, password } = req.body;

  // Dummy credentials check — replace with DB logic later
  if (email === 'faisal.dpathshala@gmail.com' && password === 'F@isal8646') {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.cookie('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    return res.status(200).json({ message: 'Login success' });
  }

  return res.status(401).json({ message: 'Invalid credentials' });
};


exports.checkAdminAuth = (req, res) => {
  const token = req.cookies.admin_token;
  if (token === 'your-secret') {
    return res.json({ success: true }); // ✅ match frontend
  }
  return res.status(401).json({ success: false }); // ✅ match frontend
};

exports.adminLogout = (req, res) => {
  res.clearCookie('admin_token');
  return res.status(200).json({ success: true, message: 'Logged out successfully' });
};

exports.checkAdminSession = (req, res) => {
  const token = req.cookies.admin_token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Optionally verify token here (e.g., with JWT or simple check)
  if (token === 'your-secret') {
    return res.status(200).json({ message: 'Authenticated' });
  } else {
    return res.status(401).json({ message: 'Invalid token' });
  }
};