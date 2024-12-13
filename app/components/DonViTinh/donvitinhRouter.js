const donvitinhController = require('./donvitinhService');
const express = require('express'); 
const router = express.Router();

// GET METHOD
router.get('/', donvitinhController.getDonViTinhs);

// POST METHOD
router.post('/add', (req, res, next)=>{
    console.log("router log:", req.body);
    next();
})
router.post('/add', donvitinhController.createDonViTinh);

// PUT METHOD
router.put('/:id', donvitinhController.updateDonViTinh);

// DELETE METHOD
router.delete('/:id', donvitinhController.deleteDonViTinh);

module.exports = router;