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
        
        // const existingTaiKhoan = await taikhoan.findOne({where: {tentaikhoan: id}});
        const existingTaiKhoan = await taikhoan.findByPk(id);
        if(existingTaiKhoan){
            const updatedTaiKhoan = await existingTaiKhoan.update(data);
            return updatedTaiKhoan;
        }
        return null;
        
    },
    deleteTaiKhoan: async(id) => {
        const taikhoanRecord = await taikhoan.findByPk(id);
    
        if (taikhoanRecord) {
            const deletedTaiKhoan = await taikhoanRecord.destroy();
            return deletedTaiKhoan;
        }
        return null;
    }
}