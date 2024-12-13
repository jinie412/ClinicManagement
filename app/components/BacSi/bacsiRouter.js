const bacsiController = require('./bacsiController');  
const express = require('express');
const router = express.Router();

router.get('/', bacsiController.getBacSis);
router.get('/:id', bacsiController.getBacSiById);

router.post('/new', (req, res, next) => {
    console.log('Router log:', req.body);
    next();
});
router.post('/new', bacsiController.createBacSi);

router.put('/:id', bacsiController.updateBacSi);
router.delete('/:id', bacsiController.deleteBacSi);

module.exports = router;
