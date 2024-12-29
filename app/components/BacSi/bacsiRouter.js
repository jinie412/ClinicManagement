const express = require('express');
const bacsiController = require('./bacsiController');
const router = express.Router();

router.post('/login', bacsiController.login);
router.put('/change-password', bacsiController.changePassword);
//anh dai dien
router.post('/upload-avatar', bacsiController.uploadAvatar);

router.get('/avatar', bacsiController.getAvatar);

router.get('/', bacsiController.getBacSis);

router.get('/info', bacsiController.getBacSiInfo);

//router.post('/add', bacsiController.createBacSi);

router.put('/update', bacsiController.updateBacSi);

//router.put('/update/:id', bacsiController.updateBacSi);
//router.delete('/delete/:id', bacsiController.deleteBacSi);

module.exports = router;
