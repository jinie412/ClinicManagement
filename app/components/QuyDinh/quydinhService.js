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
    updateQuyDinh: async (maquydinh, soluongbenhnhantoida, tienkham) => {
        const t = await sequelize.transaction();
        try {
            const qd = await quydinh.findByPk(maquydinh);
            if (qd) {
                await qd.update(
                    {
                        maquydinh: maquydinh,
                        soluongbenhnhantoida: soluongbenhnhantoida,
                        tienkham: tienkham
                    },
                    { transaction: t }
                );
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
    increaseLoaiBenh: async() =>{
        try {
            const qd = await quydinh.findOne({
                where: {
                    maquydinh: 1
                }
            });
            if(qd){
                await qd.update({
                    soluongloaibenh: qd.soluongloaibenh + 1
                });
                console.log("Quy dinh:", qd);
                return qd;
            }
            return null;
        }
        catch (error) {
            return null;
        }
    },
    decreaseLoaiBenh: async() =>{
        try {
            const qd = await quydinh.findOne({
                where: {
                    maquydinh: 1
                }
            });
            if(qd){
                await qd.update({
                    soluongloaibenh: qd.soluongloaibenh - 1
                });
                console.log("Quy dinh:", qd);
                return qd;
            }
            return null;
        }
        catch (error) {
            return null;
        }
    },
    increaseMedicine: async() =>{
        try {
            const qd = await quydinh.findOne({
                where: {
                    maquydinh: 1
                }
            });
            if(qd){
                await qd.update({
                    soluongloaithuoc: qd.soluongloaithuoc + 1
                });
                console.log("Quy dinh:", qd);
                return qd;
            }
            return null;
        }
        catch (error) {
            return null;
        }
    },
    descreaseMedicine: async() =>{
        try {
            const qd = await quydinh.findOne({
                where: {
                    maquydinh: 1
                }
            });
            if(qd){
                await qd.update({
                    soluongloaithuoc: qd.soluongloaithuoc - 1
                });
                console.log("Quy dinh:", qd);
                return qd;
            }
            return null;
        }
        catch (error) {
            return null;
        }
    },
    increaseUnit: async() =>{
        try {
            const qd = await quydinh.findOne({
                where: {
                    maquydinh: 1
                }
            });
            if(qd){
                await qd.update({
                    soluongloaidonvi: qd.soluongloaidonvi + 1
                });
                console.log("Quy dinh:", qd);
                return qd;
            }
            return null;
        }
        catch (error) {
            return null;
        }
    },

    decreaseUnit: async() =>{
        try {
            const qd = await quydinh.findOne({
                where: {
                    maquydinh: 1
                }
            });
            if(qd){
                await qd.update({
                    soluongloaidonvi: qd.soluongloaidonvi - 1
                });
                console.log("Quy dinh:", qd);
                return qd;
            }
            return null;
        }
        catch (error) {
            return null;
        }
    },

    increaseInstruction: async() =>{
        try {
            const qd = await quydinh.findOne({
                where: {
                    maquydinh: 1
                }
            });
            if(qd){
                await qd.update({
                    soluongcachdung: qd.soluongcachdung + 1
                });
                console.log("Quy dinh:", qd);
                return qd;
            }
            return null;
        }
        catch (error) {
            return null;
        }
    },

    decreaseInstruction: async() =>{
        try {
            const qd = await quydinh.findOne({
                where: {
                    maquydinh: 1
                }
            });
            if(qd){
                await qd.update({
                    soluongcachdung: qd.soluongcachdung - 1
                });
                console.log("Quy dinh:", qd);
                return qd;
            }
            return null;
        }
        catch (error) {
            return null;
        }
    }
}