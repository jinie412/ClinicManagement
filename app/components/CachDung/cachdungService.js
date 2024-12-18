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
        const existingCachDung = await cachdung.findByPk(id);
        if (existingCachDung) {
            return await existingCachDung.update(data);
        }
        return null;
    },
    deleteCachDung: async (id) => {
        const cachdungRecord = await cachdung.findByPk(id);
        if (cachdungRecord) {
            await cachdungRecord.destroy();
            return true;
        }
        return false;
    }
}