exports.adminLogin = (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ error: 'Password is required' });
  }

  if (password === process.env.ADMIN_PASSWORD) {
    // ✅ Set the admin_token cookie
    res.cookie('admin_token', 'your-secret', {
  httpOnly: true,
  secure: true, // ✅ MUST be true in production (Render uses HTTPS)
  sameSite: 'None', // ✅ allow cross-site cookie (between Vercel and Render)
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
});

    return res.status(200).json({ success: true, message: "Admin login successful" });
  } else {
    return res.status(401).json({ error: "Invalid admin password" });
  }
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