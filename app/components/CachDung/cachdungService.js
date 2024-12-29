const {cachdung} = require('../../models/model.index');
const quydinhService = require('../QuyDinh/quydinhService');

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
        try {
            const cachdungRecord = await cachdung.findByPk(id);
            if (cachdungRecord) {
                const deletedRecord = await cachdungRecord.destroy();
                if (deletedRecord) {
                    await quydinhService.decreaseInstruction();
                    return deletedRecord;
                }
            }
            return null;
        } catch (error) {
            console.error("Error deleting cachdung:", error);
            return null;
        }
    }
}