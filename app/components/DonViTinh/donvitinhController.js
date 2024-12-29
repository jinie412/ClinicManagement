const donvitinhService = require('./donvitinhService');
const quydinhService = require('../QuyDinh/quydinhService');

module.exports = {
    // GET /api/donvitinh
    getDonViTinhs: async (req, res) => {
        try {
            const donvitinh = await donvitinhService.getDonViTinhs();
            if (!donvitinh) {
                return res.status(404).json({
                    success: false,
                    message: 'Failed to retrieve list of units.'
                });
            }
            res.status(200).json({
                success: true,
                message: 'Retrieved list of units successfully.',
                data: donvitinh
            });
        } catch (error) {
            console.error('Error fetching units:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to retrieve units.',
                error: error.message
            });
        }
    },

    // GET /api/donvitinh/:id
    getDonViTinhById: async (req, res) => {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'ID is required to fetch the unit.'
                });
            }

            const donvitinh = await donvitinhService.getDonViTinhById(id);

            if (donvitinh) {
                res.status(200).json({
                    success: true,
                    message: 'Retrieved unit details successfully.',
                    data: donvitinh
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: `Unit with ID ${id} not found.`
                });
            }
        } catch (error) {
            console.error('Error fetching unit by ID:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to retrieve unit.',
                error: error.message
            });
        }
    },

    // POST /api/donvitinh/add
    createDonViTinh: async (req, res) => {
        try {
            const body = req.body;
            console.log("body", body);

            if (!body || Object.keys(body).length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Unit data is required to create a new entry.'
                });
            }
            const quydinh = await quydinhService.increaseUnit();

            const donvitinh = await donvitinhService.createDonViTinh(body);

            
            res.status(201).json({
                success: true,
                message: 'Unit created successfully.',
                data: donvitinh, quydinh
            });
        } catch (error) {
            console.error('Error creating unit:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to create unit.',
                error: error.message
            });
        }
    },

    // PUT /api/donvitinh/:id
    updateDonViTinhById: async (req, res) => {
        try {
            const id = req.params.id;
            const body = req.body;

            if (!body || Object.keys(body).length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Unit data is required to update.'
                });
            }

            const donvitinh = await donvitinhService.updateDonViTinh(id, body);

            if (donvitinh) {
                res.status(200).json({
                    success: true,
                    message: 'Unit updated successfully.',
                    data: donvitinh
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: `Unit with ID ${id} not found.`
                });
            }
        } catch (error) {
            console.error('Error updating unit:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to update unit.',
                error: error.message
            });
        }
    },

    // DELETE /api/donvitinh/:id
    deleteDonViTinh: async (req, res) => {
        try {
            const id = req.params.id;

            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'ID is required to delete the unit.'
                });
            }
            
            const result = await donvitinhService.deleteDonViTinh(id);


            if (result) {
                res.status(200).json({
                    success: true,
                    message: 'Unit deleted successfully.'
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: `Unit with ID ${id} not found.`
                });
            }
        } catch (error) {
            console.error('Error deleting unit:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to delete unit.',
                error: error.message
            });
        }
    }
};
