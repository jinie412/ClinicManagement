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
        const cachdungthuoc = await cachdungthuoc.findByPk(id);
        if (cachdungthuoc) {
            return await cachdungthuoc.update(data);
        }
        return null;
    },
    deleteCachDungThuoc: async (id) => {
        const cachdungthuoc = await cachdungthuoc.findByPk(id);
        if (cachdungthuoc) {
            await cachdungthuoc.destroy();
            return true;
        }
        return false;
    }
}