const loaibenhService = require('./loaibenhService');

module.exports = {
    // GET /api/loaibenh
    getLoaiBenhs: async (req, res) => {
        try {
            const loaibenhs = await loaibenhService.getLoaiBenhs();
            res.status(200).json({
                success: true,
                message: 'Retrieved list of diseases successfully.',
                data: loaibenhs
            });
        } catch (error) {
            console.error('Error fetching diseases:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to retrieve diseases.',
                error: error.message
            });
        }
    },
    // GET /api/loaibenh/:id
    getLoaiBenhById: async (req, res) => {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'ID is required to fetch the disease.'
                });
            }

            const loaibenh = await loaibenhService.getLoaiBenhById(id);

            if (loaibenh) {
                res.status(200).json({
                    success: true,
                    data: loaibenh
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: `Disease with ID ${id} not found.`
                });
            }
        } catch (error) {
            console.error('Error fetching disease by ID:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to retrieve disease.',
                error: error.message
            });
        }
    },
    // POST /api/loaibenh/new
    createLoaiBenh: async (req, res) => {
        try {
            const { tenloaibenh } = req.body;

            if (!tenloaibenh) {
                return res.status(400).json({
                    success: false,
                    message: 'Disease name is required.'
                });
            }

            const newLoaiBenh = await loaibenhService.createLoaiBenh(tenloaibenh);

            res.status(201).json({
                success: true,
                message: 'Disease created successfully.',
                data: newLoaiBenh
            });
        } catch (error) {
            console.error('Error creating disease:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to create disease.',
                error: error.message
            });
        }
    },
    // PUT /api/loaibenh/update/:id
    updateLoaiBenh: async (req, res) => {
        try {
            const { id } = req.params;
            const { tenloaibenh } = req.body;

            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'ID is required to update the disease.'
                });
            }

            if (!tenloaibenh) {
                return res.status(400).json({
                    success: false,
                    message: 'Disease name is required.'
                });
            }

            const updatedLoaiBenh = await loaibenhService.updateLoaiBenh(id, tenloaibenh);

            if (updatedLoaiBenh) {
                res.status(200).json({
                    success: true,
                    message: 'Disease updated successfully.',
                    data: updatedLoaiBenh
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: `Disease with ID ${id} not found.`
                });
            }
        } catch (error) {
            console.error('Error updating disease:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to update disease.',
                error: error.message
            });
        }
    },
    // DELETE /api/loaibenh/delete/:id
    deleteLoaiBenh: async (req, res) => {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'ID is required to delete the disease.'
                });
            }

            const deletedLoaiBenh = await loaibenhService.deleteLoaiBenh(id);

            if (deletedLoaiBenh) {
                res.status(200).json({
                    success: true,
                    message: 'Disease deleted successfully.',
                    data: deletedLoaiBenh
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: `Disease with ID ${id} not found.`
                });
            }
        } catch (error) {
            console.error('Error deleting disease:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to delete disease.',
                error: error.message
            });
        }
    }
}