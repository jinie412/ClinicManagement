const cachdungController = require('./cachdungController');
const express = require('express');
const router = express.Router();

// GET METHOD
router.get('/', cachdungController.getCachDungs);

// POST METHOD
router.post('/add', cachdungController.createCachDung);

// PUT METHOD
router.put('/update/:id', cachdungController.updateCachDung);

// DELETE METHOD
router.delete('/delete/:id', cachdungController.deleteCachDung);

module.exports = router;