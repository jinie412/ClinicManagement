const express = require('express');
const bacsiController = require('./bacsiController');
const router = express.Router();

router.post('/login', bacsiController.login);

router.get('/', bacsiController.getBacSis);
router.get('/:id', bacsiController.getBacSiById);

router.get('/add', (req, res, next) => {
    console.log('Router log:', req.body);
    next();
  });
router.post('/add', bacsiController.createBacSi);

router.put('/update/:id', bacsiController.updateBacSi);
router.delete('/delete/:id', bacsiController.deleteBacSi);

module.exports = router;
