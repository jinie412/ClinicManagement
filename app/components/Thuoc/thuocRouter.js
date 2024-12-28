const thuocController = require('./thuocController');
const express = require('express');
const router = express.Router();

router.get('/', thuocController.getThuocs);
router.get('/getphieukhambenhs', thuocController.getThuocPhieuKhamBenhs);
router.get('/getphieukhambenhs/:id', thuocController.getThuocKhamBenhById);
router.get('/:id', thuocController.getThuocById);

// router.post('/add', thuocController.createThuoc);
router.post('/increaseMedicine', thuocController.increaseMedicine);

router.put('/update', thuocController.updateThuoc);
router.put('/update/:id', thuocController.updateThuocById);

router.delete('/delete/:id', thuocController.deleteThuoc);

module.exports = router;