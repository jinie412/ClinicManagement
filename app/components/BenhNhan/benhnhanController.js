const benhnhanService = require('./benhnhanService');
const phieukhambenhService = require('../PhieuKhamBenh/phieukhambenhService');

module.exports = {
    // GET /api/getkhambenh
    getBenhNhanKhamBenh: async (req, res) => {
        try {
            const benhnhan = await benhnhanService.getBenhNhanKhamBenh();
            res.status(200).json({
                success: true,
                message: 'Retrieved list of patients successfully.',
                data: benhnhan
            });
        } catch (error) {
            console.error('Error fetching patients:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to retrieve patients.',
                error: error.message
            });
        }
    },

    // GET /api/getkhambenh/:id
    getBenhNhanKhamBenhById: async (req, res) => {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'Patient ID is required.'
                });
            }

            const benhnhan = await benhnhanService.getBenhNhanKhamBenhById(id);
            if (benhnhan) {
                res.status(200).json({
                    success: true,
                    data: benhnhan,
                    message: 'Retrieved patient details successfully.'
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: `Patient with ID ${id} not found.`
                });
            }
        } catch (error) {
            console.error('Error fetching patient details:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to retrieve patient details.',
                error: error.message
            });
        }
    },

    // GET /api/benh-nhan
    getBenhNhans: async (req, res) => {
        try {
            const benhnhans = await benhnhanService.getBenhNhans();
            if (!benhnhans) {
                return res.status(404).json({
                    success: false,
                    message: 'Failed to retrieve list of patients.'
                });
            }
            res.status(200).json({
                success: true,
                data: benhnhans,
                message: 'Retrieved list of patients successfully.'
            });
        } catch (error) {
            console.error('Error fetching patients:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to retrieve patients.',
                error: error.message
            });
        }
    },

    // GET /api/benh-nhan/:id
    getBenhNhanById: async (req, res) => {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'Patient ID is required.'
                });
            }

            const benhnhan = await benhnhanService.getBenhNhanById(id);
            if (benhnhan) {
                res.status(200).json({
                    success: true,
                    data: benhnhan,
                    message: 'Retrieved patient details successfully.'
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: `Patient with ID ${id} not found.`
                });
            }
        } catch (error) {
            console.error('Error fetching patient details:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to retrieve patient details.',
                error: error.message
            });
        }
    },

    // POST /api/benh-nhan/new
    createAndUpateBenhNhan: async (req, res) => {
        try {
            const { body } = req;

            if (!body || Object.keys(body).length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Patient data is required to create a new record.'
                });
            }
        
            benhnhan = await benhnhanService.getBenhNhanById(body.mabenhnhan);

            if (benhnhan) {
                // Nếu tồn tại, cập nhật thông tin bệnh nhân
                benhnhan = await benhnhanService.updateBenhNhan(body.mabenhnhan, body);
                return res.status(200).json({
                    success: true,
                    data: benhnhan,
                    message: 'Updated patient successfully.'
                });
            }


            benhnhan = await benhnhanService.createBenhNhan(body);
            const date = new Date().toISOString().split("T")[0];

            //Create a new phieukhambenh 
            const phieukhambenh = await phieukhambenhService.createPhieuKhamBenh({
                mabenhnhan: body.mabenhnhan,
                ngaykham: date,
                trangthai: 'Chưa khám',
                mabacsi: 1
            });

            res.status(201).json({
                success: true,
                data: benhnhan, phieukhambenh,
                message: 'Created patient successfully.'
            });
        } catch (error) {
            console.error('Error creating patient:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to create patient.',
                error: error.message
            });
        }
    },

    // PUT /api/benh-nhan/update/:id
    updateBenhNhan: async (req, res) => {
        try {
            const { id } = req.params;
            const { body } = req;

            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'Patient ID is required to update the record.'
                });
            }

            if (!body || Object.keys(body).length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Updated patient data is required.'
                });
            }

            const benhnhan = await benhnhanService.updateBenhNhan(id, body);
            if (benhnhan) {
                res.status(200).json({
                    success: true,
                    data: benhnhan,
                    message: 'Updated patient successfully.'
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: `Patient with ID ${id} not found.`
                });
            }
        } catch (error) {
            console.error('Error updating patient:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to update patient.',
                error: error.message
            });
        }
    },

    // DELETE /api/benh-nhan/delete/:id
    deleteBenhNhan: async (req, res) => {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'Patient ID is required to delete the record.'
                });
            }

            const result = await benhnhanService.deleteBenhNhan(id);
            if (result) {
                res.status(200).json({
                    success: true,
                    message: 'Deleted patient successfully.'
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: `Patient with ID ${id} not found.`
                });
            }
        } catch (error) {
            console.error('Error deleting patient:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to delete patient.',
                error: error.message
            });
        }
    }
};
