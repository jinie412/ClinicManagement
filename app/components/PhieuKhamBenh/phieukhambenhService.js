const {phieukhambenh} = require('../../models/model.index');

module.exports = {
    getPhieuKhamBenhs: async () =>{
        return await phieukhambenh.findAll();
    },
    getPhieuKhamBenhById: async(id) =>{
        return await phieukhambenh.findByPk(id);
    },
    createPhieuKhamBenh: async(data) =>{
        return await phieukhambenh.create(data);
    },
    updatePhieuKhamBenh: async(id, data) =>{
        const phieukhambenh = await phieukhambenh.findByPk(id);
        if(phieukhambenh){
            return await phieukhambenh.update(data);
        }
        return null;
    },
    deletePhieuKhamBenh: async(id) =>{
        const phieukhambenh = await phieukhambenh.findByPk(id);
        if(phieukhambenh){
            await phieukhambenh.destroy();
            return true;
        }
        return false;
    }
}