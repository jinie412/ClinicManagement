const {cachdungthuoc} = require('../../models/model.index');

module.exports = {
    getCachDungThuocs: async () => {
        return await cachdungthuoc.findAll();
    },
    getCachDungThuocById: async (id) => {
        return await cachdungthuoc.findByPk(id);
    },
    createCachDungThuoc: async (data) => {
        return await cachdungthuoc.create(data);
    },
    updateCachDungThuoc: async (id, data) => {
        const existingCachDungThuoc = await cachdungthuoc.findByPk(id);
        if (existingCachDungThuoc) {
            return await existingCachDungThuoc.update(data);
        }
        return null;
    },
    deleteCachDungThuoc: async (id) => {
        const cachdungthuocRecord = await cachdungthuoc.findByPk(id);
        if (cachdungthuocRecord) {
            await cachdungthuocRecord.destroy();
            return true;
        }
        return false;
    }
}