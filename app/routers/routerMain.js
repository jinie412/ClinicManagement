const express = require('express');
const router = express.Router();
const benhnhanRouter = require('../components/BenhNhan/benhnhanRouter');
const phieukhambenhRouter = require('../components/PhieuKhamBenh/phieukhambenhRouter');
const bacsiRouter = require('../components/BacSi/bacsiRouter');
const taikhoanRouter = require('../components/TaiKhoan/taikhoanRouter');
const path = require('path');

// Định nghĩa route cho trang chủ
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/index.html'));
});

router.use('/api/benhnhan', benhnhanRouter);
router.use('/api/phieukhambenh', phieukhambenhRouter);
router.use('/api/bacsi', bacsiRouter);
router.use('/api/taikhoan', taikhoanRouter);

module.exports = router;