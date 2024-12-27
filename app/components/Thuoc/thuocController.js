const thuocService = require('./thuocService'); 
const quydinhService = require('../QuyDinh/quydinhService');
const donvitinhService = require('../DonViTinh/donvitinhService');

module.exports = {
    // GET /api/thuoc/getphieukhambenhs/:id
    getThuocKhamBenhById: async (req, res) => {
        try {
            const { id } = req.params;
            const [month, year] = id.split('-');
            if (!month || !year) {
                return res.status(400).json({
                    success: false,
                    message: 'Month and year are required to fetch medication.'
                });
            }
    
            const thuoc = await thuocService.getThuocKhamBenhById(month, year);
    
            if (thuoc) {
                res.status(200).json({
                    success: true,
                    data: thuoc,
                    message: 'Get medication details successfully!'
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: `Medication with month ${month} and year ${year} not found.`
                });
            }
        } catch (error) {
            console.error('Error fetching medication by month and year:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to retrieve medication.',
                error: error.message
            });
        }
    },

    //Get /api/thuoc/getphieukhambenhs
    getThuocPhieuKhamBenhs: async (req, res) => {
        try {
            const phieuKhamBenhs = await thuocService.getPhieuKhamBenhs();
            res.status(200).json({
                success: true,
                data: phieuKhamBenhs,
                message: 'Retrieved list of medical records successfully.'
            });
        } catch (error) {
            console.error('Error fetching medical records:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to retrieve medical records.',
                error: error.message
            });
        }
    },

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
            const body = req.body;

            if (!body) {
                return res.status(400).json({
                    success: false,
                    message: 'Medication details are required.'
                });
            }

            const newThuoc = await thuocService.createThuoc(body);

            quydinhService.increaseMedicine();

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

    // DELETE /api/thuoc/delete/:id
    deleteThuoc: async (req, res) => {
        try {
            const id = req.params.id;

            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'ID is required to delete medication.'
                });
            }

            const deletedThuoc = await thuocService.deleteThuoc(id);

            quydinhService.descreaseMedicine();

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
    },
    increaseMedicine: async (req, res) => {
        try {
            const { tenthuoc, tendonvi, soluongnhap, soluongcon, cachdungthuocs, dongia } = req.body;

            if (!tenthuoc || !tendonvi || !soluongnhap || !soluongcon || !cachdungthuocs || !dongia) {
                return res.status(400).json({
                    success: false,
                    message: 'All fields are required: tenthuoc, soluongnhap, soluongcon, cachdungthuocs, dongia.'
                });
            }

            // Get madonvi from donvitinh with tendonvi
            const donvitinh = await donvitinhService.getDonViTinhByTen(tendonvi);
            if (!donvitinh) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid tendonvi.'
                });
            }
            console.log(donvitinh);

            const madonvi = donvitinh.dataValues.madonvi;

            //increase medicine in table quydinh
            quydinhService.increaseMedicine();

            const result = await thuocService.increaseMedicine({ tenthuoc, madonvi, soluongnhap, soluongcon, cachdungthuocs, dongia });

            if (result) {
                res.status(200).json({
                    success: true,
                    message: 'Medicine increased successfully.',
                    data: result
                });
            } else {
                res.status(500).json({
                    success: false,
                    message: 'Failed to increase medicine.'
                });
            }
        } catch (error) {
            console.error('Error increasing medicine:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to increase medicine.',
                error: error.message
            });
        }
    },

    // PUT /api/thuoc/update/:id
    updateThuoc: async (req, res) => {
        try {
            const { mathuoc, name, unit, inputQuantity, remainingQuantity, usage, price } = req.body;
            console.log('body:', req.body);
    
            if (!mathuoc || !name || !unit || !inputQuantity || !remainingQuantity || !usage || !price) {
                return res.status(400).json({
                    success: false,
                    message: 'All fields are required: mathuoc, name, unit, inputQuantity, remainingQuantity, usage, price.'
                });
            }
    
            // Get madonvi from donvitinh with unit
            const donvitinh = await donvitinhService.getDonViTinhByTen(unit);
            if (!donvitinh) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid unit.'
                });
            }
    
            const madonvi = donvitinh.dataValues.madonvi;
    
            // Update medicine in table thuoc
            const updatedMedicine = await thuocService.updateThuoc(
                {
                    mathuoc,
                    tenthuoc: name,
                    madonvi,
                    soluongnhap: inputQuantity,
                    soluongcon: remainingQuantity,
                    cachdungthuocs: usage,
                    dongia: price
                }
            );
    
            if (updatedMedicine) {
                res.status(200).json({
                    success: true,
                    message: 'Medicine updated successfully.',
                    data: updatedMedicine
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: `Medicine with ID ${mathuoc} not found.`
                });
            }
        } catch (error) {
            console.error('Error updating medicine:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to update medicine.',
                error: error.message
            });
        }
    }
}