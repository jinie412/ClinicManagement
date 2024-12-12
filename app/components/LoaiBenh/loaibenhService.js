const {loaibenh} = require('../../models/model.index');

module.exports = {
    getLoaiBenhs: async () => {
        return await loaibenh.findAll();
    },
    getLoaiBenhById: async (id) => {
        return await loaibenh.findByPk(id);
    },
    createLoaiBenh: async (data) => {
        return await loaibenh.create(data);
    },
    updateLoaiBenh: async (id, data) => {
        const loaibenh = await loaibenh.findByPk(id);
        if (loaibenh) {
            return await loaibenh.update(data);
        }
        return null;
    },
    deleteLoaiBenh: async (id) => {
        const loaibenh = await loaibenh.findByPk(id);
        if (loaibenh) {
            await loaibenh.destroy();
            return true;
        }
        return false;
    }
}