const phieukhambenhService = require('./phieukhambenhService');

module.exports = {
    
    // GET /api/phieukhambenh
    getPhieuKhamBenhs: async (req, res) => { 
        try {
            const phieukhambenh = await phieukhambenhService.getPhieuKhamBenhs();
            res.status(200).json(phieukhambenh);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // GET /api/phieukhambenh/:id
    getPhieuKhamBenhById: async (req, res) => {
        try {
            const phieukhambenh = await phieukhambenhService.getPhieuKhamBenhById(req.params.id);
            if (phieukhambenh) {
                res.status(200).json(phieukhambenh);
            } else {
                res.status(404).json({ message: 'PhieuKhamBenh not found' });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // POST /api/phieukhambenh
    createPhieuKhamBenh: async (req, res) => {
        try {
            const phieukhambenh = await phieukhambenhService.createPhieuKhamBenh(req.body);
            res.status(201).json(phieukhambenh);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // PUT /api/phieukhambenh/:id
    updatePhieuKhamBenhById: async (req, res) => {
        try {
            const phieukhambenh = await phieukhambenhService.updatePhieuKhamBenh(req.params.id, req.body);
            if (phieukhambenh) {
                res.status(200).json(phieukhambenh);
            } else {
                res.status(404).json({ message: 'PhieuKhamBenh not found' });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // DELETE /api/phieukhambenh/:id
    deletePhieuKhamBenhById: async (req, res) => {
        try {
            const result = await phieukhambenhService.deletePhieuKhamBenh(req.params.id);
            if (result) {
                res.status(200).json({ message: 'PhieuKhamBenh deleted successfully' });
            } else {
                res.status(404).json({ message: 'PhieuKhamBenh not found' });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },
};