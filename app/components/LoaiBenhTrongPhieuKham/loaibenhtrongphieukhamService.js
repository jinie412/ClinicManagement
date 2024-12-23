// const e = require('express');
const {loaibenhtrongphieukham, sequelize} = require('../../models/model.index');

module.exports = {
    getLoaiBenhTrongPhieuKhams: async() =>{
        return await loaibenhtrongphieukham.findAll();
    },
    getLoaiBenhTrongPhieuKhamById: async(id) =>{
        return await loaibenhtrongphieukham.findByPk(id);
    },
    createLoaiBenhTrongPhieuKham: async (data) => {
        const t = await sequelize.transaction();
        try {
            const newRecord = await loaibenhtrongphieukham.upsert(data, { transaction: t });
            if (newRecord) {
                await t.commit();
                return newRecord;
            }
            await t.rollback();
            return null;
        } catch (error) {
            await t.rollback();
            throw error;
        }
    },
    updateLoaiBenhTrongPhieuKham: async(id, data) =>{
        const t = await sequelize.transaction();
        try{
            const updatedRecord = await loaibenhtrongphieukham.update(
                data, 
                {where: {maphieukham: id}}, 
                {transaction: t}
            );
            if(updatedRecord){
                await t.commit();
                return updatedRecord;
            }
            await t.rollback();
            return null;
        } catch(error){
            await t.rollback();
            throw error;
        }
    },
    deleteLoaiBenhTrongPhieuKham: async(id) =>{
        const t = await sequelize.transaction();
        try{
            const deletedRecord = await loaibenhtrongphieukham.destroy(
                {where: {maphieukham: id.maphieukham, maloaibenh: id.maloaibenh}}, 
                {transaction: t}
            );
            if(deletedRecord){
                await t.commit();
                return deletedRecord;
            }
            await t.rollback();
            return null;
        } catch(error){
            await t.rollback();
            throw error;
        }
    }
}