const quydinhController = require('./quydinhController');
const express = require('express');
const router = express.Router();

// GET METHOD
router.get('/', quydinhController.getQuyDinhs);
router.get('/:id', quydinhController.getQuyDinhById);

// POST METHOD
router.post('/add', (req, res, next)=>{
    console.log("router log:", req.body);
    next();
})
router.post('/add', quydinhController.createQuyDinh);

// PUT METHOD
router.put('/update/:id', quydinhController.updateQuyDinh);

// DELETE METHOD
router.delete('/delete/:id', quydinhController.deleteQuyDinh);

module.exports = router;