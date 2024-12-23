const canlamsangController = require('./canlamsangController'); 
const express = require('express');
const router = express.Router();

// GET METHOD
router.get('/', canlamsangController.getCanLamSangs);
router.get('/:id', canlamsangController.getCanLamSangById);

// POST METHOD
router.post('/add', (req, res, next)=>{
    console.log("router log:", req.body);
    next();
})
router.post('/add', canlamsangController.createCanLamSang);

// PUT METHOD
router.put('/update/:id', canlamsangController.updateCanLamSang);

// DELETE METHOD
router.delete('/delete/:id', canlamsangController.deleteCanLamSang);

module.exports = router;