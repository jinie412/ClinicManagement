const express = require('express');
const phieukhambenhController = require('./phieukhambenhController');  
const router = express.Router();

// GET METHOD
router.get('/', phieukhambenhController.getPhieuKhamBenhs);
router.get('/:id', phieukhambenhController.getPhieuKhamBenhById);

// POST METHOD
router.post('/new', (req, res, next) => {
    console.log('Router log:', req.body);
    next();
  });
router.post('/new', phieukhambenhController.createPhieuKhamBenh);

// PUT METHOD
router.put('/:id', phieukhambenhController.updatePhieuKhamBenhById);

// DELETE METHOD
router.delete('/:id', phieukhambenhController.deletePhieuKhamBenhById);

module.exports = router;