const cachdungthuocService = require('./cachdungthuocService');

module.exports = {
    // GET /api/cach-dung-thuoc
    getCachDungThuocs: async (req, res) => {
        try {
            const cachdungthuoc = await cachdungthuocService.getCachDungThuocs();
            if (cachdungthuoc) {
                res.status(200).json({
                    success: true,
                    data: cachdungthuoc,
                    message: 'Get list of medication uses successfully !'
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: 'Failed to retrieve medication uses.'
                });
            }
        } catch (err) {
            res.status(500).json({
                success: false,
                message: 'Failed to retrieve medication uses.',
                error: err.message
            });
        }
    },

    // GET /api/cach-dung-thuoc/:id  
    getCachDungThuocById: async (req, res) => {
        try {
            const cachdungthuoc = await cachdungthuocService.getCachDungThuocById(req.params.id);
            if (cachdungthuoc) {
                res.status(200).json({
                    success: true,
                    data: cachdungthuoc,
                    message: 'Get medication use details successfully !'
                });
            } else {
                res.status(404).json({ 
                    success: false,
                    message: 'Failed to retrieve medication use details'
                 });
            }
        } catch (err) {
            res.status(500).json({
                success: false,
                message: 'Failed to retrieve medication use details.',
                error: err.message
            });
        }
    },

    // POST /api/cach-dung-thuoc/new
    createCachDungThuoc: async (req, res) => {
        try {
            const cachdungthuoc = await cachdungthuocService.createCachDungThuoc(req.body);
            if (cachdungthuoc) {
                res.status(200).json({
                    success: true,
                    data: cachdungthuoc,
                    message: 'Create medication use successfully !'
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: 'Failed to create medication use'
                });
            }
        } catch (err) {
            res.status(500).json({
                success: false,
                message: 'Failed to create medication use',
                error: err.message
            });
        }
    },

    // PUT /api/cach-dung-thuoc/update/:id
    updateCachDungThuoc: async (req, res) => {
        try {
            const cachdungthuoc = await cachdungthuocService.updateCachDungThuoc(req.params.id, req.body);
            if (cachdungthuoc) {
                res.status(200).json({
                    success: true,
                    data: cachdungthuoc,
                    message: 'Update medication use successfully !'
                })
            } else {
                res.status(404).json({
                    success: false,
                    message: 'Failed to update medication use.'
                });
            }
        } catch (err) {
            res.status(500).json({
                success: false,
                message: 'Failed to update medication use.',
                error: err.message
            });
        }
    },

    // DELETE /api/cach-dung-thuoc/delete/:id
    deleteCachDungThuoc: async (req, res) => {
        try {
            const result = await cachdungthuocService.deleteCachDungThuoc(req.params.id);
            if (result) {
                res.status(200).json({ 
                    success: true,
                    message: 'Delete medication use successfully !'
                });
            } else {
                res.status(404).json({ 
                    success: false,
                    message: 'Failed to delete medication use'
                });
            }
        } catch (err) {
            res.status(500).json({
                success: false,
                message: 'Failed to delete medication use',
                error: err.message
            });
        }
    }
}