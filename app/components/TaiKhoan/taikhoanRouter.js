const taikhoanController = require('./taikhoanController');
const express = require('express');
const router = express.Router();

router.get('/', taikhoanController.getTaiKhoans);
router.get('/:id', taikhoanController.getTaiKhoanById);

router.post('/new', (req, res, next)=>{
    console.log("router log:", req.body);
    next();
})
router.post('/new', taikhoanController.createTaiKhoan);

router.put('/:id', taikhoanController.updateTaiKhoan);
router.delete('/:id', taikhoanController.deleteTaiKhoan);

module.exports = router;
