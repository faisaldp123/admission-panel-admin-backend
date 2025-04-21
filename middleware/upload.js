const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'universities',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    public_id: (req, file) => `banner-${Date.now()}`,
  },
});

const upload = multer({ storage });
module.exports = upload;