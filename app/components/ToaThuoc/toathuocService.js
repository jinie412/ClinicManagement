const {toathuoc, sequelize} = require('../../models/model.index');
const { getChiTietToaThuoc } = require('./toathuocController');

module.exports = {
    getToaThuocs: async () => {
        return await toathuoc.findAll();
    },
    getToaThuocById: async (id) => {
        return await toathuoc.findByPk(id);
    },
    createToaThuoc: async (data) => {
        return await toathuoc.bulkCreate(data);
    },
    updateToaThuoc: async (id, data) => {
        const t = await sequelize.transaction();
        try {
            const updatedToaThuoc = await toathuoc.update(
                data, 
                {where: {maphieukham: id.maphieukham, mathuoc: id.mathuoc}},
                {transaction: t}
            );

            if (updatedToaThuoc) {
                await t.commit();
                return updatedToaThuoc;
            }
            await t.rollback();
            return null;
        } catch (error) {
            await t.rollback();
            throw error;
        }
    },
    deleteToaThuoc: async (id) => {
        const t = await sequelize.transaction();
        try{
            const toathuocRecord = await toathuoc.destroy(
                {where: {maphieukham : id.maphieukham, mathuoc: id.mathuoc}},
                {transaction: t}
            );
            if(toathuocRecord){
                await t.commit();
                return toathuocRecord;
            }
            await t.rollback();
            return null;
        }catch(error){
            await t.rollback();
            throw error;
        }
    }
}