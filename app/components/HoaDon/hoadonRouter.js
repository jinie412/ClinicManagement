const hoadonController = require('./hoadonController');
const express = require('express');
const router = express.Router();

// GET METHOD
router.get('/', hoadonController.getHoaDons);
router.get('/:id', hoadonController.getHoaDonById);

// POST METHOD
router.post('/add', (req, res, next)=>{
    console.log("router log:", req.body);
    next();
})
router.post('/add', hoadonController.createHoaDon);

// PUT METHOD
router.put('/update/:id', hoadonController.updateHoaDon);

// DELETE METHOD
router.delete('/delete/:id', hoadonController.deleteHoaDon);

module.exports = router;