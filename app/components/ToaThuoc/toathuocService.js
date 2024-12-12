const {toathuoc} = require('../../models/model.index');


module.exports = {
    getToaThuocs: async () => {
        return await toathuoc.findAll();
    },
    getToaThuocById: async (id) => {
        return await toathuoc.findByPk(id);
    },
    createToaThuoc: async (data) => {
        return await toathuoc.create(data);
    },
    updateToaThuoc: async (id, data) => {
        const toathuoc = await toathuoc.findByPk(id);
        if (toathuoc) {
            return await toathuoc.update(data);
        }
        return null;
    },
    deleteToaThuoc: async (id) => {
        const toathuoc = await toathuoc.findByPk(id);
        if (toathuoc) {
            await toathuoc.destroy();
            return true;
        }
        return false;
    }
}