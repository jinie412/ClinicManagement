const {quydinh, sequelize} = require('../../models/model.index');

module.exports = {
    getQuyDinhs: async () =>{
        return await quydinh.findAll();
    },
    getQuyDinhById: async(id) =>{
        return await quydinh.findByPk(id);
    },
    createQuyDinh: async(data) =>{
        const t = await sequelize.transaction();
        try {
            const qd = await quydinh.create(data, {transaction: t});
            await t.commit();
            return qd;
        } catch (error) {
            await t.rollback();
            return false;
        }
    },
    updateQuyDinh: async(id, data) =>{
        const t = await sequelize.transaction();
        try {
            const qd = await quydinh.findByPk(id);
            if(qd){
                await qd.update(data, {transaction: t});
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
    deleteQuyDinh: async(id) =>{
        const t = await sequelize.transaction();
        try {
            const qd = await quydinh.findByPk(id);
            if(qd){
                await qd.destroy({transaction: t});
                await t.commit();
                return true;
            }
            await t.rollback();
            return false;
        } catch (error) {
            await t.rollback();
            return false;
        }
    }
}