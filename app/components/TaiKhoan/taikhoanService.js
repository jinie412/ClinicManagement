const {taikhoan} = require('../../models/model.index');

module.exports = {
    getTaiKhoans: async() =>{
        return await taikhoan.findAll();
    },
    getTaiKhoanById: async(id) =>{
        return await taikhoan.findByPk(id);
    },
    createTaiKhoan: async(data) =>{
        return await taikhoan.create(data);
    },
    updateTaiKhoan: async(id, data) =>{
        const taikhoan = await taikhoan.findByPk(id);
        if(taikhoan){
            return await taikhoan.update(data);
        }
        return null;
    },
    deleteTaiKhoan: async(id) =>{
        const taikhoan = await taikhoan.findByPk(id);
        if(taikhoan){
            await taikhoan.destroy();
            return true;
        }
        return false;
    }
}