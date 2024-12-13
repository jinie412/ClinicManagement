const express = require('express');
const benhnhanController = require('./benhnhanController');
const router = express.Router();

// GET METHOD
router.get('/', benhnhanController.getBenhNhans);
router.get('/:id', benhnhanController.getBenhNhanById);

// POST METHOD
router.post('/new', (req, res, next) => {
    console.log('Router log:', req.body);
    next();
  });
router.post('/new', benhnhanController.createBenhNhan);

// PUT METHOD
router.put('/update/:id', benhnhanController.updateBenhNhan);

// DELETE METHOD
router.delete('/delete/:id', benhnhanController.deleteBenhNhan);

module.exports = router;
