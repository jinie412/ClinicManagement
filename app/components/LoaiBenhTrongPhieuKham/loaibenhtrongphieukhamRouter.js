const loaibenhtrongphieukhamController = require('./loaibenhtrongphieukhamController');
const express = require('express');
const router = express.Router();

// GET METHOD
router.get('/', loaibenhtrongphieukhamController.getLoaiBenhTrongPhieuKhams);
router.get('/:id', loaibenhtrongphieukhamController.getLoaiBenhTrongPhieuKhamById);

// POST METHOD
router.post('/add', (req, res, next)=>{
    console.log("router log:", req.body);
    next();
})
router.post('/add', loaibenhtrongphieukhamController.createLoaiBenhTrongPhieuKham);

// PUT METHOD
router.put('/update/:maphieukham/:maloaibenh', loaibenhtrongphieukhamController.updateLoaiBenhTrongPhieuKham);

// DELETE METHOD
router.delete('/delete/:maphieukham/:maloaibenh', loaibenhtrongphieukhamController.deleteLoaiBenhTrongPhieuKham);

module.exports = router;