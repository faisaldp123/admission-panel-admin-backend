const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("✅ Cloudinary connected:", {
  name: process.env.CLOUDINARY_CLOUD_NAME,
  key: process.env.CLOUDINARY_API_KEY ? '✅' : '❌',
  secret: process.env.CLOUDINARY_API_SECRET ? '✅' : '❌',  // You can log it like this for a more secure check
});

module.exports = cloudinary;
