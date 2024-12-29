const {donvitinh, quydinh} = require('../../models/model.index');
const quydinhService = require('../QuyDinh/quydinhService');

module.exports = {
    getDonViTinhs: async() =>{
        return await donvitinh.findAll();
    },
    getDonViTinhById: async(id) =>{
        return await donvitinh.findByPk(id);
    },
    createDonViTinh: async(data) =>{
        return await donvitinh.create(data);
    },
    updateDonViTinh: async(id, data) =>{
        const dvt = await donvitinh.findByPk(id);
        if(dvt){
            return await dvt.update(data);
        }
        return null;
    },
    deleteDonViTinh: async(id) =>{
        try {
            const dvt = await donvitinh.findByPk(id);
            await quydinhService.decreaseUnit();
            if(dvt){
                return await dvt.destroy();
            }
            return null;
        } catch (error) {
            return null;
        }
    },
    getDonViTinhByTen: async(ten) =>{
        return await donvitinh.findOne({
            where: {tendonvi: ten}
        });
    }
}