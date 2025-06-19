const jwt = require('jsonwebtoken');

exports.adminLogin = (req, res) => {
  const { email, password } = req.body;
console.log(email, password)
  if (email === 'faisal.dpathshala@gmail.com' && password === 'F@isal8646') {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.cookie('admin_token', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production', // Only true on production
  sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

    return res.status(200).json({ success: true, message: 'Login success' });
  }

  return res.status(401).json({ success: false, error: 'Invalid credentials' });
};

// ✅ Updated: Check and verify JWT
exports.checkAdminAuth = (req, res) => {
  const token = req.cookies.admin_token;
  if (!token) return res.status(401).json({ success: false });

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(401).json({ success: false });
  }
};

exports.adminLogout = (req, res) => {
  res.clearCookie('admin_token');
  return res.status(200).json({ success: true, message: 'Logged out successfully' });
};

// ✅ Also verify token properly here
exports.checkAdminSession = (req, res) => {
  const token = req.cookies.admin_token;
  console.log(req.cookies.admin_token)
  // console.log()
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({ message: 'Authenticated' });
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
