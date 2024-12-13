const taikhoanService = require('./taikhoanService');

module.exports = {
    getTaiKhoans: async(req, res) =>{
        try {
            const taikhoans = await taikhoanService.getTaiKhoans();
            res.status(200).json(taikhoans);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getTaiKhoanById: async(req, res) =>{
        try {
            const taikhoan = await taikhoanService.getTaiKhoanById(req.params.id);
            if(taikhoan){
                res.status(200).json(taikhoan);
            }else{
                res.status(404).json({message: 'Không tìm thấy tài khoản'});
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },
    createTaiKhoan: async(req, res) =>{
        try {
            const taikhoan = await taikhoanService.createTaiKhoan(req.body);
            res.status(201).json(taikhoan);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    updateTaiKhoan: async(req, res) =>{
        try {
            const taikhoan = await taikhoanService.updateTaiKhoan(req.params.id, req.body);
            if(taikhoan){
                res.status(200).json(taikhoan);
            }else{
                res.status(404).json({message: 'Không tìm thấy tài khoản'});
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },
    deleteTaiKhoan: async(req, res) =>{
        try {
            const result = await taikhoanService.deleteTaiKhoan(req.params.id);
            if(result){
                res.status(200).json({message: 'Xóa thành công'});
            }else{
                res.status(404).json({message: 'Không tìm thấy tài khoản'});
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
}