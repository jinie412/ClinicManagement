const {quydinh} = require('../../models/model.index');

module.exports = {
    getQuyDinhs: async () =>{
        return await quydinh.findAll();
    },
    getQuyDinhById: async(id) =>{
        return await quydinh.findByPk(id);
    },
    createQuyDinh: async(data) =>{
        return await quydinh.create(data);
    },
    updateQuyDinh: async(id, data) =>{
        const quydinh = await quydinh.findByPk(id);
        if(quydinh){
            return await quydinh.update(data);
        }
        return null;
    },
    deleteQuyDinh: async(id) =>{
        const quydinh = await quydinh.findByPk(id);
        if(quydinh){
            await quydinh.destroy();
            return true;
        }
        return false;
    }
}