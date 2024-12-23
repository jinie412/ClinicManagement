const { where } = require('sequelize');
const {canlamsang, sequelize} = require('../../models/model.index');

module.exports = {
    getCanLamSangs: async () => {
        return await canlamsang.findAll();
    },
    getCanLamSangById: async (id) => {
        return await canlamsang.findAll({where: {maphieukham: id}});
    },
    createCanLamSang: async (data) => {
        const t = await sequelize.transaction();
        try {
            await canlamsang.upsert(data, {transaction: t});
            await t.commit();
            return true;
        } catch (error) {
            await t.rollback();
            return false;
        }
    },
    updateCanLamSang: async (id, data) => {
        const t = await sequelize.transaction();
        try {
            const cls = await canlamsang.findByPk(id);
            if (cls) {
                await cls.update(data, {transaction: t});
                await t.commit();
                return true;
            }
            await t.rollback();
            return false;
        } catch (error) {
            await t.rollback();
            return false;
        }
    },
    deleteCanLamSang: async (id) => {
        const t = await sequelize.transaction();
        try {
            const cls = await canlamsang.destroy({where: {maphieukham: id},transaction: t});
            if (cls) {
                await t.commit();
                return true;
            }else{
                await t.rollback();
                return false;
            }
        } catch (error) {
            await t.rollback();
            return false;
        }
    }
}