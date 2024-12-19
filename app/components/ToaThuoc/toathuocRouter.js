const toathuocController = require('./toathuocController');
const express = require('express');
const router = express.Router();

router.get('/', toathuocController.getToaThuocs);
router.get('/:id', toathuocController.getToaThuocById);

router.post('/add', toathuocController.createToaThuoc);

router.put('/update/:maphieukham/:mathuoc', toathuocController.updateToaThuoc);

router.delete('/delete/:maphieukham/:mathuoc', toathuocController.deleteToaThuoc);

module.exports = router;