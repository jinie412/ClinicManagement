const {thuoc,donvitinh,cachdungthuoc, cachdung} = require('../../models/model.index');

module.exports = {
    getThuocs: async () => {
        return await thuoc.findAll({
            include: [
                {
                    model: donvitinh,
                    as: 'donvitinh'
                },
                {
                    model: cachdungthuoc,
                    as: 'cachdungthuocs',
                    include: [
                        {
                            model: cachdung,
                            as: 'cachdung'
                        }
                    ]
                }
            ]
        });
    },
    getThuocById: async (id) => {
        return await thuoc.findByPk(id);
    },
    createThuoc: async (data) => {
        return await thuoc.bulkCreate(data);
    },
    updateThuoc: async (id, data) => {
        const existingThuoc = await thuoc.findByPk(id);
        if (existingThuoc) {
            return await existingThuoc.update(data);
        }
        return null;
    },
    deleteThuoc: async (id) => {
        const thuocRecord = await thuoc.findByPk(id);
        if (thuocRecord) {
            await thuocRecord.destroy();
            return true;
        }
        return false;
    }
}

