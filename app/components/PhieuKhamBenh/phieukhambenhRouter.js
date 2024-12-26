const express = require('express');
const phieukhambenhController = require('./phieukhambenhController');  
const router = express.Router();

// GET METHOD
router.get('/', phieukhambenhController.getPhieuKhamBenhs);
router.get('/chi-tiet', phieukhambenhController.getChiTietPhieuKham);
router.get('/:id', phieukhambenhController.getPhieuKhamBenhById);
router.get('/chi-tiet-toa-thuoc/:id', phieukhambenhController.getToaThuocByIdPhieuKham);
router.get('/chan-doan/:id', phieukhambenhController.getChanDoanByIdPhieuKham);

// POST METHOD
router.post('/add', phieukhambenhController.createPhieuKhamBenh);
router.post('/new', phieukhambenhController.createNewPhieuKhamBenh);

// PUT METHOD
router.put('/update/:id', phieukhambenhController.updatePhieuKhamBenh);

// DELETE METHOD
router.delete('/delete/:id', phieukhambenhController.deletePhieuKhamBenh);

module.exports = router;