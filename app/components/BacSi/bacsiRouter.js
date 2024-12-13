const express = require('express');
const bacsiController = require('./bacsiController');
const router = express.Router();

router.post('/login', bacsiController.login);

router.get('/', bacsiController.getBacSis);
router.get('/:id', bacsiController.getBacSiById);

router.post('/new', bacsiController.createBacSi);

router.put('/:id', bacsiController.updateBacSi);
router.delete('/:id', bacsiController.deleteBacSi);

module.exports = router;
