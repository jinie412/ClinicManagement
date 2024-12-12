const {thuoc} = require('../../models/model.index');

module.exports = {
    getThuocs: async () => {
        return await thuoc.findAll();
    },
    getThuocById: async (id) => {
        return await thuoc.findByPk(id);
    },
    createThuoc: async (data) => {
        return await thuoc.create(data);
    },
    updateThuoc: async (id, data) => {
        const thuoc = await thuoc.findByPk(id);
        if (thuoc) {
            return await thuoc.update(data);
        }
        return null;
    },
    deleteThuoc: async (id) => {
        const thuoc = await thuoc.findByPk(id);
        if (thuoc) {
            await thuoc.destroy();
            return true;
        }
        return false;
    }
}

