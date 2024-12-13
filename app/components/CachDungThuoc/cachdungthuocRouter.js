const cachdungthuocController = require('./cachdungthuocController');
const express = require('express');
const router = express.Router();

// GET METHOD
router.get('/', cachdungthuocController.getCachDungThuocs);

// POST METHOD
router.post('/add', (req, res, next)=>{
    console.log("router log:", req.body);
    next();
})
router.post('/add', cachdungthuocController.createCachDungThuoc);

// PUT METHOD
router.put('/update/:id', cachdungthuocController.updateCachDungThuoc);

// DELETE METHOD
router.delete('/delete/:id', cachdungthuocController.deleteCachDungThuoc);

module.exports = router;