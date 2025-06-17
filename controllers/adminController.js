exports.adminLogin = (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ error: 'Password is required' });
  }

  if (password === process.env.ADMIN_PASSWORD) {
    // ✅ Set the admin_token cookie
    res.cookie('admin_token', 'your-secret', {
  httpOnly: true,
  secure: true, // force for production
  sameSite: 'none', // ✅ required for cross-site cookies (e.g., Render + Vercel)
  maxAge: 7 * 24 * 60 * 60 * 1000
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