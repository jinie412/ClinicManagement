const thuocService = require('./thuocService'); 

module.exports = {
    // GET /api/thuoc
    getThuocs: async (req, res) => {
        try {
            const thuoc = await thuocService.getThuocs();
            if (thuoc) {
                res.status(200).json({
                    success: true,
                    data: thuoc,
                    message: 'Get list of medications successfully !'
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: 'Failed to retrieve medications.'
                });
            }
        } catch (err) {
            res.status(500).json({
                success: false,
                message: 'Failed to retrieve medications.',
                error: err.message
            });
        }
    },

    // GET /api/thuoc/:id
    getThuocById: async (req, res) => {
        try {
            const {id} = req.params;
            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'ID is required to fetch medication.'
                });
            }

            const thuoc = await thuocService.getThuocById(id);

            if (thuoc) {
                res.status(200).json({
                    success: true,
                    data: thuoc,
                    message: 'Get medication details successfully !'
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: `Medication with ID ${id} not found.`
                });
            }
        } catch (error){
            console.error('Error fetching medication by ID:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to retrieve medication.',
                error: error.message
            });
        }
    },

    // POST /api/thuoc/add
    createThuoc: async (req, res) => {
        try {
            const {thuoc} = req.body;

            if (!thuoc) {
                return res.status(400).json({
                    success: false,
                    message: 'Medication details are required.'
                });
            }

            const newThuoc = await thuocService.createThuoc(thuoc);

            res.status(201).json({
                success: true,
                message: 'Medication created successfully.',
                data: newThuoc
            });
        }catch(error){
            console.error('Error creating medication:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to create medication.',
                error: error.message
            });
        }
    },

    // PUT /api/thuoc/update/:id
    updateThuoc: async (req, res) => {
        try {
            const {id} = req.params;
            const {thuoc} = req.body;

            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'ID is required to update medication.'
                });
            }

            if (!thuoc) {
                return res.status(400).json({
                    success: false,
                    message: 'Medication details are required.'
                });
            }

            const updatedThuoc = await thuocService.updateThuoc(id, thuoc);

            if (updatedThuoc) {
                res.status(200).json({
                    success: true,
                    message: 'Medication updated successfully.',
                    data: updatedThuoc
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: `Medication with ID ${id} not found.`
                });
            }
        } catch (error) {
            console.error('Error updating medication:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to update medication.',
                error: error.message
            });
        }
    },

    // DELETE /api/thuoc/delete/:id
    deleteThuoc: async (req, res) => {
        try {
            const {id} = req.params;

            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'ID is required to delete medication.'
                });
            }

            const deletedThuoc = await thuocService.deleteThuoc(id);

            if (deletedThuoc) {
                res.status(200).json({
                    success: true,
                    message: 'Medication deleted successfully.',
                    data: deletedThuoc
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: `Medication with ID ${id} not found.`
                });
            }
        } catch (error) {
            console.error('Error deleting medication:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to delete medication.',
                error: error.message
            });
        }
    }
}