const {loadbenhtrongphieukham} = require('../../models/model.index');

module.exports = {
    getLoaiBenhTrongPhieuKhams: async() =>{
        return await loadbenhtrongphieukham.findAll();
    },
    getLoaiBenhTrongPhieuKhamById: async(id) =>{
        return await loadbenhtrongphieukham.findByPk(id);
    },
    createLoaiBenhTrongPhieuKham: async(data) =>{
        return await loadbenhtrongphieukham.create(data);
    },
    updateLoaiBenhTrongPhieuKham: async(id, data) =>{
        const loadbenhtrongphieukham = await loadbenhtrongphieukham.findByPk(id);
        if(loadbenhtrongphieukham){
            return await loadbenhtrongphieukham.update(data);
        }
        return null;
    },
    deleteLoaiBenhTrongPhieuKham: async(id) =>{
        const loadbenhtrongphieukham = await loadbenhtrongphieukham.findByPk(id);
        if(loadbenhtrongphieukham){
            await loadbenhtrongphieukham.destroy();
            return true;
        }
        return false;
    }
}