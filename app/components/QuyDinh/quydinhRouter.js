const quydinhController = require('./quydinhController');
const express = require('express');
const router = express.Router();

// GET METHOD
router.get('/', quydinhController.getQuyDinhs);
router.get('/:id', quydinhController.getQuyDinhById);

// PUT METHOD
router.put('/update', quydinhController.updateQuyDinh);

module.exports = router;