const benhnhanService = require('./benhnhanService');

// GET /api/benhnhan
exports.getBenhNhans = async (req, res) => {
    try {
        const benhnhans = await benhnhanService.getBenhNhans();
        res.status(200).json(benhnhans);
        // const renamedBenhNhans = benhnhans.map(benhnhan => ({
        //     // ...benhnhan,
        //     id: benhnhan.mabenhnhan.toString(),
        //     name: benhnhan.hoten,
        //     gender: benhnhan.gioitinh,
        //     ethnicity: benhnhan.dantoc,
        //     birthDate: benhnhan.ngaysinh,
        //     address: benhnhan.diachi,
        //     phone: benhnhan.sodienthoai,
        //     job: benhnhan.nghenghiep,
        //     notes: benhnhan.ghichu,
        //   }));
        // res.status(200).json(renamedBenhNhans);

    } catch (error) {
        res.status(500).json(error);
    }
};

// GET /api/benhnhan/:id
exports.getBenhNhanById = async (req, res) => {
    try {
        const benhnhan = await benhnhanService.getBenhNhanById(req.params.id);
        if (benhnhan) {
            res.status(200).json(benhnhan);
        } else {
            res.status(404).json({ message: 'BenhNhan not found' });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

// POST /api/benhnhan/them-benh-nhan
exports.createBenhNhan = async (req, res) => {
    try {
        const benhnhan = await benhnhanService.createBenhNhan(req.body);
        res.status(201).json(benhnhan);
    } catch (error) {
        res.status(500).json(error);
    }
};

// PUT /api/benhnhan/:id
exports.updateBenhNhan = async (req, res) => {
    try {
        const benhnhan = await benhnhanService.updateBenhNhan(req.params.id, req.body);
        if (benhnhan) {
            res.status(200).json(benhnhan);
        } else {
            res.status(404).json({ message: 'BenhNhan not found' });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

// DELETE /api/benhnhan/:id
exports.deleteBenhNhan = async (req, res) => {
    try {
        const result = await benhnhanService.deleteBenhNhan(req.params.id);
        if (result) {
            res.status(200).json({ message: 'BenhNhan deleted successfully' });
        } else {
            res.status(404).json({ message: 'BenhNhan not found' });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};