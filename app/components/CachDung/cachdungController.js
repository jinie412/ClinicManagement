const cachdungService = require('./cachdungService');
const quydinhService = require('../QuyDinh/quydinhService');

module.exports = {
    // GET /api/cach-dung
    getCachDungs: async (req, res) => {
        try {
            const cachdungs = await cachdungService.getCachDungs();
            
            if (!cachdungs) {
                return res.status(404).json({
                    success: false,
                    message: 'Failed to retrieve list of uses.'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Retrieved list of uses successfully.',
                data: cachdungs
            });
        } catch (error) {
            console.error('Error fetching uses:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to retrieve uses.',
                error: error.message
            });
        }
    },

    // POST /api/cach-dung/new
    createCachDung: async (req, res) => {
        try {
            const body = req.body;

            if (!body || Object.keys(body).length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Data is required to create a new use.'
                });
            }
            
            const quydinh = await quydinhService.increaseInstruction();

            const cachdung = await cachdungService.createCachDung(body);


            res.status(201).json({
                success: true,
                data: cachdung,
                message: 'Created use successfully.'
            });
        } catch (error) {
            console.error('Error creating use:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to create use.',
                error: error.message
            });
        }
    },

    // PUT /api/cach-dung/update/:id
    updateCachDung: async (req, res) => {
        try {
            const id = req.params.id;
            const body = req.body;

            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'ID is required to update use.'
                });
            }

            if (!body || Object.keys(body).length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Updated data is required.'
                });
            }

            const cachdung = await cachdungService.updateCachDung(id, body);

            if (cachdung) {
                res.status(200).json({
                    success: true,
                    data: cachdung,
                    message: 'Updated use successfully.'
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: `Use with ID ${id} not found.`
                });
            }
        } catch (error) {
            console.error('Error updating use:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to update use.',
                error: error.message
            });
        }
    },

    // DELETE /api/cach-dung/delete/:id
    deleteCachDung: async (req, res) => {
        try {
            const id = req.params.id;

            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'ID is required to delete use.'
                });
            }

            const result = await cachdungService.deleteCachDung(id);


            if (result) {
                res.status(200).json({
                    success: true,
                    data: quydinh,
                    message: 'Deleted use successfully.'
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: `Use with ID ${id} not found.`
                });
            }
        } catch (error) {
            console.error('Error deleting use:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to delete use.',
                error: error.message
            });
        }
    }
};
