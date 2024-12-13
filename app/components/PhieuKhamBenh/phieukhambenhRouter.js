const express = require('express');
const phieukhambenhController = require('./phieukhambenhController');  
const router = express.Router();

// GET METHOD
router.get('/', phieukhambenhController.getPhieuKhamBenhs);
router.get('/:id', phieukhambenhController.getPhieuKhamBenhById);

// POST METHOD
router.post('/add', (req, res, next) => {
    console.log('Router log:', req.body);
    next();
  });
router.post('/add', phieukhambenhController.createPhieuKhamBenh);

// PUT METHOD
router.put('/update/:id', phieukhambenhController.updatePhieuKhamBenh);

// DELETE METHOD
router.delete('/delete/:id', phieukhambenhController.deletePhieuKhamBenh);

module.exports = router;