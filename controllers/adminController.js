

exports.adminLogin = (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ error: 'Password is required' });
  }

  if (password === process.env.ADMIN_PASSWORD) {
    return res.status(200).json({ success: true, message: "Admin login successful" });
  } else {
    return res.status(401).json({ error: "Invalid admin password" });
  }
};