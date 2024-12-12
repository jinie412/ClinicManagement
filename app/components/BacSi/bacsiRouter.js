const express = require('express');
const bacsiController = require('./bacsiController');
const router = express.Router();

router.get('/', bacsiController.getBacsis);
router.post('/login', bacsiController.login);


module.exports = router;
