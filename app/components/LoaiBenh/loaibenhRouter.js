const loaibenhController = require('./loaibenhController'); 
const express = require('express');
const router = express.Router();

// GET METHOD
router.get('/', loaibenhController.getLoaiBenhs);
router.get('/:id', loaibenhController.getLoaiBenhById);

// POST METHOD
router.post('/add', (req, res, next)=>{
    console.log("router log:", req.body);
    next();
})
router.post('/add', loaibenhController.createLoaiBenh);

// PUT METHOD
router.put('/update/:id', loaibenhController.updateLoaiBenh);

// DELETE METHOD
router.delete('/delete/:id', loaibenhController.deleteLoaiBenh);

module.exports = router;