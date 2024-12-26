const {hoadon} = require('../../models/model.index');

module.exports = {
    getHoaDons: async () => {
        return await hoadon.findAll();
    },
    getHoaDonById: async (id) => {
        return await hoadon.findByPk(id);
    },
    createHoaDon: async (data) => {
        return await hoadon.upsert(data);
    },
    updateHoaDon: async (id, data) => {
        const hoadon = await hoadon.findByPk(id);
        if (hoadon) {
            return await hoadon.update(data);
        }
        return null;
    },
    deleteHoaDon: async (id) => {
        const hoadon = await hoadon.findByPk(id);
        if (hoadon) {
            await hoadon.destroy();
            return true;
        }
        return false;
    }
}