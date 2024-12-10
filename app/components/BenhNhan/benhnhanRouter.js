const express = require('express');
const benhnhanController = require('./benhnhanController');

const router = express.Router();

router.get('/', benhnhanController.getBenhNhans);
router.get('/:id', benhnhanController.getBenhNhanById);

router.post('/new', (req, res, next) => {
    console.log('Router log:', req.body);
    next();
  });
router.post('/new', benhnhanController.createBenhNhan);

router.put('/:id', benhnhanController.updateBenhNhan);
router.delete('/:id', benhnhanController.deleteBenhNhan);

module.exports = router;
