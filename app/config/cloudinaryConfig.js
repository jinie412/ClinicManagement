// filepath: /d:/IT_3/NM CNPM/Project/app/config/cloudinaryConfig.js
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dndz9zhsd',
    api_key: '173491251637152',
    api_secret: '8Y-YDlnWSqswmUUeuFldzVyEpZs'
});

module.exports = cloudinary;