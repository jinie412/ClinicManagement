const e = require('express');
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
    getBacSis: async () => {
        return await bacsi.findAll();
    },
    getBacSiById: async (id) => {
        return await bacsi.findByPk(id);
    },
    createBacSi: async (data) => {
        return await bacsi.create(data);
    },
    updateBacSi: async (mabacsi, data) => {
        console.log("Update:", mabacsi, data);
        const doctor = await bacsi.findByPk(mabacsi);
        if (doctor) {
            return await doctor.update(data);
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
    },
    getBacSi : async () => {
        return await bacsi.findAll({
            include: [
                {
                    model: taikhoan,
                    as: 'taikhoan'
                }
            ]
        });
    },
    changePassword: async (username, newPassword) => {
        const account = await taikhoan.findOne({ where: { tentaikhoan: username } });
        if (account) {
            return await account.update({ matkhau: newPassword });
        }
        return null;
    },
    updateAvatar: async (id, avatarUrl) => {
        const doctor = await bacsi.findByPk(id);
        if (doctor) {
            doctor.anhdaidien = avatarUrl;
            await doctor.save();
            return doctor;
        }
        else {
            console.log("Doctor not found");
            return null;
        }
    },

    getAvatar: async (id) => {
        const doctor = await bacsi.findByPk(id);
        if (doctor) {
            return doctor.anhdaidien;
        }
        return null;
    },
}