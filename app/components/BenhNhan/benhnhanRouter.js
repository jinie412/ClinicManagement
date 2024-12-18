const express = require('express');
const benhnhanController = require('./benhnhanController');
const router = express.Router();

// GET METHOD
router.get('/', benhnhanController.getBenhNhans);
router.get('/getkhambenh', benhnhanController.getBenhNhanKhamBenh);

router.get('/:id', benhnhanController.getBenhNhanById);

router.get('/getkhambenh/:id', benhnhanController.getBenhNhanKhamBenhById);

// POST METHOD
router.post('/add', benhnhanController.createAndUpateBenhNhan);

// PUT METHOD
router.put('/update/:id', benhnhanController.updateBenhNhan);

// DELETE METHOD
router.delete('/delete/:id', benhnhanController.deleteBenhNhan);

module.exports = router;
