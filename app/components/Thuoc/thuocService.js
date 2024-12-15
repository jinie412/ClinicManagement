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
        return await thuoc.create(data);
    },
    updateThuoc: async (id, data) => {
        const thuoc = await thuoc.findByPk(id);
        if (thuoc) {
            return await thuoc.update(data);
        }
        return null;
    },
    deleteThuoc: async (id) => {
        const thuoc = await thuoc.findByPk(id);
        if (thuoc) {
            await thuoc.destroy();
            return true;
        }
        return false;
    }
}

