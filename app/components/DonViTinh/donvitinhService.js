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
    deleteDonViTinh: async (id) => {
        try {
            const dvt = await donvitinh.findByPk(id);
            if (dvt) {
                const deletedUnit = await dvt.destroy();
                if (deletedUnit) {
                    await quydinhService.decreaseUnit();
                    return deletedUnit;
                }
            }
            return null;
        } catch (error) {
            console.error("Error deleting donvitinh:", error);
            return null;
        }
    },
        
    getDonViTinhByTen: async(ten) =>{
        return await donvitinh.findOne({
            where: {tendonvi: ten}
        });
    }
}