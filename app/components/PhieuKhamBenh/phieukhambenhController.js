const phieukhambenhService = require('./phieukhambenhService');
const toaThuocService = require('../ToaThuoc/toathuocService');
const benhnhanService = require('../BenhNhan/benhnhanService');
// const { get } = require('./phieukhambenhRouter');

module.exports = {
    // GET /api/phieu-kham-benh/chan-doan/:maphieukham
    getChanDoanByIdPhieuKham: async (req, res) => {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'ID is required to fetch the diagnosis.'
                });
            }

            const chanDoan = await phieukhambenhService.getChanDoanByIdPhieuKham(id);

            if (chanDoan) {
                res.status(200).json({
                    success: true,
                    data: chanDoan
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: `Diagnosis with ID ${maphieukham} not found.`
                });
            }
        } catch (error) {
            console.error('Error fetching diagnosis by ID:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to retrieve diagnosis.',
                error: error.message
            });
        }
    },
    // GET /api/phieu-kham-benh/chi-tiet-toa-thuoc/:id
    getToaThuocByIdPhieuKham: async (req, res) => {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'ID is required to fetch the prescription.'
                });
            }

            const toathuoc = await phieukhambenhService.getToaThuocByIdPhieuKham(id);

            if (toathuoc) {
                res.status(200).json({
                    success: true,
                    data: toathuoc
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: `Prescription with ID ${id} not found.`
                });
            }
        } catch (error) {
            console.error('Error fetching prescription by ID:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to retrieve prescription.',
                error: error.message
            });
        }
    },
    // GET /api/phieu-kham-benh
    getPhieuKhamBenhs: async (req, res ) =>{
        try {
            const phieukhambenhs = await phieukhambenhService.getPhieuKhamBenhs();
            if (!phieukhambenhs) {
                return res.status(404).json({
                    success: false,
                    message: 'Failed to retrieve list of invoices.'
                });
            }
            res.status(200).json({
                success: true,
                message: 'Retrieved list of invoices successfully.',
                data: phieukhambenhs
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
    // GET /api/phieukhambenh/:id
    getPhieuKhamBenhById: async (req, res) => {
        try {
            const id = req.params.id;

            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'ID is required to fetch the invoice.'
                });
            }

            const phieukhambenh = await phieukhambenhService.getPhieuKhamBenhById(id);

            if (phieukhambenh) {
                res.status(200).json({
                    success: true,
                    data: phieukhambenh
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
    // POST /api/phieukhambenh/add
    createPhieuKhamBenh: async (req, res) => {
        try {
            const data = req.body;

            if (!data) {
                return res.status(400).json({
                    success: false,
                    message: 'Data is required to create a new invoice.'
                });
            }

            // Fetch benhnhan details
            const benhnhan = await benhnhanService.getBenhNhanById(data.mabenhnhan);
            if (!benhnhan) {
                return res.status(404).json({
                    success: false,
                    message: 'Patient not found.'
                });
            }

            // Update benhnhan with tiensu and diung
            await benhnhanService.updatePatient(data.mabenhnhan, {
                tiensu: data.tiensu,
                diung: data.diung
            });

            data.mabacsi = 1;
            const newPhieuKhamBenh = await phieukhambenhService.createPhieuKhamBenh(data);

            // Create toathuoc records if thuoc data is provided
            if (data.thuoc && Array.isArray(data.thuoc)) {
                for (const thuoc of data.thuoc) {
                    await toaThuocService.createToaThuoc({
                        maphieukham: newPhieuKhamBenh.maphieukham,
                        mathuoc: thuoc.mathuoc,
                        soluong: thuoc.soluong
                    });
                }
            }

            res.status(201).json({
                success: true,
                message: 'Created new invoice successfully.',
                data: newPhieuKhamBenh
            });
        } catch (error) {
            console.error('Error creating new invoice:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to create new invoice.',
                error: error.message
            });
        }
    },
    // POST /api/phieu-kham-benh/new
    createNewPhieuKhamBenh: async (req, res) => {
        try {
            const data = req.body;

            if (!data) {
                return res.status(400).json({
                    success: false,
                    message: 'Data is required to create a new invoice.'
                });
            }

            data.mabacsi = 1;
            data.trangthai = 'Chưa khám';
            const newPhieuKhamBenh = await phieukhambenhService.createPhieuKhamBenh(data);

            // Create toathuoc records if thuoc data is provided
            if (data.thuoc && Array.isArray(data.thuoc)) {
                for (const thuoc of data.thuoc) {
                    await toaThuocService.createToaThuoc({
                        maphieukham: newPhieuKhamBenh.maphieukham,
                        mathuoc: thuoc.mathuoc,
                        soluong: thuoc.soluong
                    });
                }
            }

            res.status(201).json({
                success: true,
                message: 'Created new invoice successfully.',
                data: newPhieuKhamBenh
            });
        } catch (error) {
            console.error('Error creating new invoice:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to create new invoice.',
                error: error.message
            });
        }
    },
    // PUT /api/phieukhambenh/update/:id
    updatePhieuKhamBenh: async (req, res) => {
        try {
            const id = req.params.id;
            const data = req.body;

            if (!id || !data) {
                return res.status(400).json({
                    success: false,
                    message: 'ID and data are required to update the invoice.'
                });
            }

            const updatedPhieuKhamBenh = await phieukhambenhService.updatePhieuKhamBenh(id, data);

            res.status(200).json({
                success: true,
                message: 'Updated invoice successfully.',
                data: updatedPhieuKhamBenh
            });
        } catch (error) {
            console.error('Error updating invoice:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to update invoice.',
                error: error.message
            });
        }
    },
    // DELETE /api/phieukhambenh/delete/:id
    deletePhieuKhamBenh: async (req, res) => {
        try {
            const id = req.params.id;

            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'ID is required to delete the invoice.'
                });
            }

            const deletedPhieuKhamBenh = await phieukhambenhService.deletePhieuKhamBenh(id);

            if (deletedPhieuKhamBenh) {
                res.status(200).json({
                    success: true,
                    message: 'Deleted invoice successfully.',
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
