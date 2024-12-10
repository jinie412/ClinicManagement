const { benhnhan } = require('../../models/model.index');

exports.getBenhNhans = async () => {
    return await benhnhan.findAll();
};

exports.getBenhNhanById = async (id) => {
    return await benhnhan.findByPk(id);
};

exports.createBenhNhan = async (data) => {
    return await benhnhan.create(data);
};

exports.updateBenhNhan = async (id, data) => {
    const benhnhan = await benhnhan.findByPk(id);
    if (benhnhan) {
        return await benhnhan.update(data);
    }
    return null;
};

exports.deleteBenhNhan = async (id) => {
    const benhnhan = await benhnhan.findByPk(id);
    if (benhnhan) {
        await benhnhan.destroy();
        return true;
    }
    return false;
};
