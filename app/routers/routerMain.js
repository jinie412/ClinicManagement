const express = require('express');
const router = express.Router();
const path = require('path');

// Định nghĩa route cho trang chủ
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../views/index.html'));
});

module.exports = router;