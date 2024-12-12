const {cachdung} = require('../../models/model.index');

module.exports = {
    getCachDungs: async () => {
        return await cachdung.findAll();
    },
    getCachDungById: async (id) => {
        return await cachdung.findByPk(id);
    },
    createCachDung: async (data) => {
        return await cachdung.create(data);
    },
    updateCachDung: async (id, data) => {
        const cachdung = await cachdung.findByPk(id);
        if (cachdung) {
            return await cachdung.update(data);
        }
        return null;
    },
    deleteCachDung: async (id) => {
        const cachdung = await cachdung.findByPk(id);
        if (cachdung) {
            await cachdung.destroy();
            return true;
        }
        return false;
    }
}