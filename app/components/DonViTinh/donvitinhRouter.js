const donvitinhController = require('./donvitinhController');
const express = require('express'); 
const router = express.Router();

// GET METHOD
router.get('/', donvitinhController.getDonViTinhs);

// POST METHOD
router.post('/add', donvitinhController.createDonViTinh);

// PUT METHOD
router.put('/:id', donvitinhController.updateDonViTinhById);

// DELETE METHOD
router.delete('/:id', donvitinhController.deleteDonViTinh);

module.exports = router;