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
        const existingLoaiBenh = await loaibenh.findByPk(id);
        if (existingLoaiBenh) {
            return await existingLoaiBenh.update(data);
        }
        return null;
    },
    deleteLoaiBenh: async (id) => {
        const loaibenhRecord = await loaibenh.findByPk(id);
        if (loaibenhRecord) {
            await loaibenhRecord.destroy();
            return true;
        }
        return false;
    }
}