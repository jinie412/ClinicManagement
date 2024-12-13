const hoadonService = require('./hoadonService');

module.exports = {
    // GET /api/hoadon
    getHoaDons: async (req, res) => {
        try {
            const hoadons = await hoadonService.getHoaDons();
            res.status(200).json({
                success: true,
                message: 'Retrieved list of invoices successfully.',
                data: hoadons
            });
        } catch (error) {
            console.error('Error fetching invoices:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to retrieve invoices.',
                error: error.message
            });
        }
    },

    // GET /api/hoadon/:id
    getHoaDonById: async (req, res) => {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'ID is required to fetch the invoice.'
                });
            }

            const hoadon = await hoadonService.getHoaDonById(id);

            if (hoadon) {
                res.status(200).json({
                    success: true,
                    data: hoadon
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: `Invoice with ID ${id} not found.`
                });
            }
        } catch (error) {
            console.error('Error fetching invoice by ID:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to retrieve invoice.',
                error: error.message
            });
        }
    },

    // POST /api/hoadon/new
    createHoaDon: async (req, res) => {
        try {
            const { body } = req;

            if (!body || Object.keys(body).length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Invoice data is required to create a new entry.'
                });
            }

            const hoadon = await hoadonService.createHoaDon(body);
            res.status(201).json({
                success: true,
                data: hoadon,
                message: 'Invoice created successfully.'
            });
        } catch (error) {
            console.error('Error creating invoice:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to create invoice.',
                error: error.message
            });
        }
    },

    // PUT /api/hoadon/:id
    updateHoaDon: async (req, res) => {
        try {
            const { id } = req.params;
            const { body } = req;

            if (!body || Object.keys(body).length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Invoice data is required to update.'
                });
            }

            const hoadon = await hoadonService.updateHoaDon(id, body);

            if (hoadon) {
                res.status(200).json({
                    success: true,
                    data: hoadon,
                    message: 'Invoice updated successfully.'
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: `Invoice with ID ${id} not found.`
                });
            }
        } catch (error) {
            console.error('Error updating invoice:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to update invoice.',
                error: error.message
            });
        }
    },

    // DELETE /api/hoadon/:id
    deleteHoaDon: async (req, res) => {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'ID is required to delete the invoice.'
                });
            }

            const result = await hoadonService.deleteHoaDon(id);

            if (result) {
                res.status(200).json({
                    success: true,
                    message: 'Invoice deleted successfully.'
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: `Invoice with ID ${id} not found.`
                });
            }
        } catch (error) {
            console.error('Error deleting invoice:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to delete invoice.',
                error: error.message
            });
        }
    }
};
