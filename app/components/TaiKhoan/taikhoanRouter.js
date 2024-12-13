const taikhoanController = require('./taikhoanController');
const express = require('express');
const router = express.Router();

router.get('/', taikhoanController.getTaiKhoans);
router.get('/:id', taikhoanController.getTaiKhoanById);

router.post('/add', (req, res, next)=>{
    console.log("router log:", req.body);
    next();
})
router.post('/add', taikhoanController.createTaiKhoan);

router.put('/update/:id', taikhoanController.updateTaiKhoan);
router.delete('/delete/:id', taikhoanController.deleteTaiKhoan);

module.exports = router;
