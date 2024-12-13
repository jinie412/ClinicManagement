const express = require('express');
const router = express.Router();

const benhnhanRouter = require('../components/BenhNhan/benhnhanRouter');
const phieukhambenhRouter = require('../components/PhieuKhamBenh/phieukhambenhRouter');
const bacsiRouter = require('../components/BacSi/bacsiRouter');
const taikhoanRouter = require('../components/TaiKhoan/taikhoanRouter');
const cachdungRouter = require('../components/CachDung/cachdungRouter');
const cachdungthuocRouter = require('../components/CachDungThuoc/cachdungthuocRouter');
const donvitinhRouter = require('../components/DonViTinh/donvitinhRouter');
const thuocRouter = require('../components/Thuoc/thuocRouter');
const toathuocRouter = require('../components/ToaThuoc/toathuocRouter');
const quydinhRouter = require('../components/QuyDinh/quydinhRouter');
const loaibenhtrongphieukhamRouter = require('../components/LoaiBenhTrongPhieuKham/loaibenhtrongphieukhamRouter');
const loaibenhRouter = require('../components/LoaiBenh/loaibenhRouter');
const hoadonRouter = require('../components/HoaDon/hoadonRouter');
const canlamsangRouter = require('../components/CanLamSang/canlamsangRouter');

const path = require('path');

// Định nghĩa route cho trang chủ
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/index.html'));
});

router.use('/api/benh-nhan', benhnhanRouter);
router.use('/api/bac-si', bacsiRouter);
router.use('/api/cach-dung', cachdungRouter);
router.use('/api/cach-dung-thuoc', cachdungthuocRouter);
router.use('/api/can-lam-sang', canlamsangRouter);
router.use('/api/don-vi-tinh', donvitinhRouter);
router.use('/api/hoa-don', hoadonRouter);
router.use('/api/loai-benh', loaibenhRouter);
router.use('/api/loai-benh-trong-phieu-kham', loaibenhtrongphieukhamRouter);
router.use('/api/phieu-kham-benh', phieukhambenhRouter);
router.use('/api/quy-dinh', quydinhRouter);
router.use('/api/tai-khoan', taikhoanRouter);
router.use('/api/thuoc', thuocRouter);
router.use('/api/toa-thuoc', toathuocRouter);

module.exports = router;