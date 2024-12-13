const {bacsi } = require('../../models/model.index');

module.exports = {
    getBacSis: async () => {
        return await bacsi.findAll();
    },
    getBacSiById: async (id) => {
        return await bacsi.findByPk(id);
    },
    createBacSi: async (data) => {
        return await bacsi.create(data);
    },
    updateBacSi: async (id, data) => {
        const bacsi = await bacsi.findByPk(id);
        if (bacsi) {
            return await bacsi.update(data);
        }
        return null;
    },
    deleteBacSi: async (id) => {
        const bacsi = await bacsi.findByPk(id);
        if (bacsi) {
            await bacsi.destroy();
            return true;
        }
        return false;
    }
}