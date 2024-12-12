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
        const donvitinh = await donvitinh.findByPk(id);
        if(donvitinh){
            return await donvitinh.update(data);
        }
        return null;
    },
    deleteDonViTinh: async(id) =>{
        const donvitinh = await donvitinh.findByPk(id);
        if(donvitinh){
            await donvitinh.destroy();
            return true;
        }
        return false;
    }
}