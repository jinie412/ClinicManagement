const {bacsi, taikhoan } = require('../../models/model.index');

module.exports = {
    login: async (data) => {
        return await taikhoan.findOne({
            where: {
                tentaikhoan: data.username,
                matkhau: data.password
            }
        });
    },
    getBacsis: async () => {
        return await bacsi.findAll();
    },
    getBacsiById: async (id) => {
        return await bacsi.findByPk(id);
    },
    createBacsi: async (data) => {
        return await bacsi.create(data);
    },
    updateBacsi: async (id, data) => {
        const bacsi = await bacsi.findByPk(id);
        if (bacsi) {
            return await bacsi.update(data);
        }
        return null;
    },
    deleteBacsi: async (id) => {
        const bacsi = await bacsi.findByPk(id);
        if (bacsi) {
            await bacsi.destroy();
            return true;
        }
        return false;
    }
}