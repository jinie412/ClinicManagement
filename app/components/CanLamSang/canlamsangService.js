const {canlamsang} = require('../../models/model.index');

module.exports = {
    getCanLamSangs: async () => {
        return await canlamsang.findAll();
    },
    getCanLamSangById: async (id) => {
        return await canlamsang.findByPk(id);
    },
    createCanLamSang: async (data) => {
        return await canlamsang.create(data);
    },
    updateCanLamSang: async (id, data) => {
        const canlamsang = await canlamsang.findByPk(id);
        if (canlamsang) {
            return await canlamsang.update(data);
        }
        return null;
    },
    deleteCanLamSang: async (id) => {
        const canlamsang = await canlamsang.findByPk(id);
        if (canlamsang) {
            await canlamsang.destroy();
            return true;
        }
        return false;
    }
}