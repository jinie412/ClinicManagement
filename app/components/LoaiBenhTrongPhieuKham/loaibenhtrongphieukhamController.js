const loaibenhtrongphieukhamService = require('./loaibenhtrongphieukhamService');

module.exports = {
    // GET /api/loaibenhtrongphieukham
    getLoaiBenhTrongPhieuKhams: async (req, res) => {
        try {
            const loaibenhtrongphieukhams = await loaibenhtrongphieukhamService.getLoaiBenhTrongPhieuKhams();
            if(!loaibenhtrongphieukhams) {
                return res.status(404).json({
                    success: false,
                    message: 'Failed to retrieve list of diseases in examination.'
                });
            }
            res.status(200).json({
                success: true,
                message: 'Retrieved list of diseases in examination successfully.',
                data: loaibenhtrongphieukhams
            });
        } catch (error) {
            console.error('Error fetching diseases in examination:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to retrieve diseases in examination.',
                error: error.message
            });
        }
    },
    // GET /api/loaibenhtrongphieukham/:id
    getLoaiBenhTrongPhieuKhamById: async (req, res) => {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'ID is required to fetch the disease in examination.'
                });
            }

            const loaibenhtrongphieukham = await loaibenhtrongphieukhamService.getLoaiBenhTrongPhieuKhamById(id);

            if (loaibenhtrongphieukham) {
                res.status(200).json({
                    success: true,
                    data: loaibenhtrongphieukham
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: `Disease in examination with ID ${id} not found.`
                });
            }
        } catch (error) {
            console.error('Error fetching disease in examination by ID:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to retrieve disease in examination.',
                error: error.message
            });
        }
    },
    // POST /api/loaibenhtrongphieukham/new
    createLoaiBenhTrongPhieuKham: async (req, res) => {
        try {
            const { idphieukham, idloaibenh } = req.body;

            if (!idphieukham || !idloaibenh) {
                return res.status(400).json({
                    success: false,
                    message: 'ID of examination and disease are required to create a disease in examination.'
                });
            }

            const loaibenhtrongphieukham = await loaibenhtrongphieukhamService.createLoaiBenhTrongPhieuKham(idphieukham, idloaibenh);

            res.status(201).json({
                success: true,
                message: 'Disease in examination created successfully.',
                data: loaibenhtrongphieukham
            });
        } catch (error) {
            console.error('Error creating disease in examination:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to create disease in examination.',
                error: error.message
            });
        }
    },
    // PUT /api/loaibenhtrongphieukham/update/:id
    updateLoaiBenhTrongPhieuKham: async (req, res) => {
        try {
            const { id } = req.params;
            const { idphieukham, idloaibenh } = req.body;

            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'ID is required to update the disease in examination.'
                });
            }

            const loaibenhtrongphieukham = await loaibenhtrongphieukhamService.updateLoaiBenhTrongPhieuKham(id, idphieukham, idloaibenh);

            if (loaibenhtrongphieukham) {
                res.status(200).json({
                    success: true,
                    message: 'Disease in examination updated successfully.',
                    data: loaibenhtrongphieukham
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: `Disease in examination with ID ${id} not found.`
                });
            }
        } catch (error) {
            console.error('Error updating disease in examination:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to update disease in examination.',
                error: error.message
            });
        }
    },
    // DELETE /api/loaibenhtrongphieukham/delete/:id
    deleteLoaiBenhTrongPhieuKham: async (req, res) => {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'ID is required to delete the disease in examination.'
                });
            }

            const loaibenhtrongphieukham = await loaibenhtrongphieukhamService.deleteLoaiBenhTrongPhieuKham(id);

            if (loaibenhtrongphieukham) {
                res.status(200).json({
                    success: true,
                    message: 'Disease in examination deleted successfully.',
                    data: loaibenhtrongphieukham
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: `Disease in examination with ID ${id} not found.`
                });
            }
        } catch (error) {
            console.error('Error deleting disease in examination:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to delete disease in examination.',
                error: error.message
            });
        }
    }
}