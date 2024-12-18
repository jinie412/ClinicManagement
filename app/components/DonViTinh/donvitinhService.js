const {donvitinh} = require('../../models/model.index');

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
        const dvt = await donvitinh.findByPk(id);
        if(dvt){
            return await dvt.destroy();
        }
        return null;
    }
}