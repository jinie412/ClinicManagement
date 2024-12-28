// const { benhnhan } = require('../../models/model.index');

// const renameKeys = (obj, keyMap) => {
//     return Object.fromEntries(
//         Object.entries(obj).map(([key, value]) => {
//             return [keyMap[key] || key, value];
//         })
//     );
// };

// keyMapViToEng = {
//     mabenhnhan: "id",
//     hoten: "name",
//     gioitinh: "gender",
//     dantoc: "ethnicity",
//     diachi: "address",
//     sodienthoai: "phone",
//     ngaysinh: "birthDate",
//     nghenghiep: "job",
//     tiensu: "medicalHistory",
//     diung: "allergy",
//     ghichu: "notes",
// }

// keyMapEngToVi = {
//     id : "mabenhnhan",
//     name : "hoten",
//     gender : "gioitinh",
//     ethnicity : "dantoc",
//     address : "diachi",
//     phone : "sodienthoai",
//     birthDate : "ngaysinh",
//     job : "nghenghiep",
//     medicalHistory : "tiensu",
//     allergy : "diung",
//     notes : "ghichu",
// }


// exports.getBenhNhans = async () => {
//     const benhnhan = await benhnhan.findAll();
//     return benhnhan.map(benhnhan => renameKeys(benhnhan, keyMapViToEng));
//     // return await benhnhan.findAll();
// };

// exports.getBenhNhanById = async (id) => {
//     const benhnhan = await benhnhan.findByPk(id);
//     if (benhnhan) {
//         return benhnhan.map(benhnhan => renameKeys(benhnhan, keyMapViToEng));
//     }
//     // return await benhnhan.findByPk(id);
// };

// exports.createBenhNhan = async (data) => {
//     return await benhnhan.create(renameKeys(data, keyMapEngToVi));
//     // return await benhnhan.create(data);
// };

// exports.updateBenhNhan = async (id, data) => {
//     data = renameKeys(data, keyMapEngToVi);
//     const benhnhan = await benhnhan.findByPk(id);
//     if (benhnhan) {
//         return await benhnhan.update(data);
//     }
//     return null;
// };

// exports.deleteBenhNhan = async (id) => {
//     data = renameKeys(data, keyMapEngToVi);
//     const benhnhan = await benhnhan.findByPk(id);
//     if (benhnhan) {
//         await benhnhan.destroy();
//         return true;
//     }
//     return false;
// };

const { benhnhan,phieukhambenh,toathuoc,thuoc,cachdungthuoc,cachdung } = require('../../models/model.index');
const { sequelize } = require('../../models/model.index');

// Hàm đổi tên key trong object
const renameKeys = (obj, keyMap) => {
    return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => {
            return [keyMap[key] || key, value];
        })
    );
};

// Viet to Eng
const keyMapViToEng = {
    mabenhnhan: "id",
    hoten: "name",
    gioitinh: "gender",
    dantoc: "ethnicity",
    diachi: "address",
    sodienthoai: "phone",
    ngaysinh: "birthDate",
    nghenghiep: "job",
    tiensu: "medicalHistory",
    diung: "allergy",
    ghichu: "notes",
};

// Eng to Viet
const keyMapEngToVi = {
    id: "mabenhnhan",
    name: "hoten",
    gender: "gioitinh",
    ethnicity: "dantoc",
    address: "diachi",
    phone: "sodienthoai",
    birthDate: "ngaysinh",
    job: "nghenghiep",
    medicalHistory: "tiensu",
    allergy: "diung",
    notes: "ghichu",
};

// Lấy tất cả bệnh nhân
exports.getBenhNhans = async () => {
    const benhnhans = await benhnhan.findAll();
    // return benhnhans.map((bn) => renameKeys(bn.toJSON(), keyMapViToEng));
    return benhnhans;
};

//Lấy tất cả bệnh nhân kèm phiếu khám bệnh theo ngày
exports.getBenhNhanKhamBenh = async () => {
    const chiTietKhamBenh = await benhnhan.findAll({
        include: [
            {
                model: phieukhambenh,
                as: 'phieukhambenhs',
            }
        ]
    });
    return chiTietKhamBenh;
};

// Lấy bệnh nhân theo id kèm phiếu khám bệnh, toa thuốc, thông tin thuốc và cách dùng
exports.getBenhNhanKhamBenhById = async (id) => {
    try {
        const query = `
            SELECT 
                bn.mabenhnhan, bn.hoten, bn.gioitinh, bn.ngaysinh, bn.diachi,
                bn.sodienthoai, bn.nghenghiep, bn.dantoc, bn.tiensu, bn.diung,bn.ghichu, 
                pkb.maphieukham, pkb.ngaykham, pkb.trieuchung, pkb.mach,
                pkb.nhietdo, pkb.huyetap, pkb.nhiptho, pkb.chieucao, pkb.cannang,
                pkb.lydokham, pkb.ghichukham, pkb.loidan, pkb.ngaytaikham,
                lb.maloaibenh, lb.tenloaibenh, pkb.trangthai
            FROM 
                benhnhan bn
            JOIN 
                phieukhambenh pkb ON bn.mabenhnhan = pkb.mabenhnhan
            LEFT JOIN
                loaibenhtrongphieukham lbpk ON pkb.maphieukham = lbpk.maphieukham
            LEFT JOIN
                loaibenh lb ON lbpk.maloaibenh = lb.maloaibenh
            WHERE 
                bn.mabenhnhan = :id
            ORDER BY 
                pkb.ngaykham DESC;
        `;

        // Thực thi câu lệnh SQL
        const results = await sequelize.query(query, {
            replacements: { id }, // Truyền tham số vào câu lệnh
            type: sequelize.QueryTypes.SELECT,
        });

        return results; // Trả về kết quả
    } catch (error) {
        console.error('Error fetching patient data:', error);
        throw error;
    }
};


// Lấy bệnh nhân theo id
exports.getBenhNhanById = async (id) => {
    const bn = await benhnhan.findByPk(id);
    if (bn) {
        return renameKeys(bn.toJSON(), keyMapViToEng);
    }
    return null;
};

// Tạo bệnh nhân mới
exports.createBenhNhan = async (data) => {
    const renamedData = renameKeys(data, keyMapEngToVi);
    const newBenhNhan = await benhnhan.upsert(renamedData);
    return newBenhNhan;
    // return renameKeys(newBenhNhan.toJSON(), keyMapViToEng);
};

// Cập nhật thông tin bệnh nhân
exports.updateBenhNhan = async (id, data) => {
    const renamedData = renameKeys(data, keyMapEngToVi);
    const bn = await benhnhan.findByPk(id);
    if (bn) {
        await bn.update(renamedData);
        return renameKeys(bn.toJSON(), keyMapViToEng);
    }
    return null;
};


// Xóa bệnh nhân
exports.deleteBenhNhan = async (id) => {
    try {
        // Tìm bệnh nhân theo ID
        const bn = await benhnhan.findByPk(id);

        if (bn) {
            // Xóa các phiếu khám bệnh liên quan trước
            await phieukhambenh.destroy({
                where: { mabenhnhan: id },
            });

            await bn.destroy();

            return true; 
        }

        return false; // Bệnh nhân không tồn tại
    } catch (error) {
        console.error('Error deleting benhnhan:', error);
        throw error; // Ném lỗi để xử lý nếu cần
    }
};

exports.updatePatient = async (id,data) => {
    try {
        const bn = await benhnhan.findByPk(id);
        if (bn) {
            await bn.update(data);
            return renameKeys(bn.toJSON(), keyMapViToEng);
        }
        return null;
    } catch (error) {
        console.error('Error updating benhnhan:', error);
        throw error;
    }
};

exports.getMedicalHistory = async (id) => {
    try {
        const query = `
            SELECT 
                pkb.maphieukham, pkb.ngaykham, pkb.trieuchung,
                pkb.ghichukham, pkb.ngaytaikham, pkb.lydokham,
                lb.tenloaibenh
            FROM 
                phieukhambenh pkb
            LEFT JOIN
                loaibenhtrongphieukham lbpk ON pkb.maphieukham = lbpk.maphieukham
            LEFT JOIN
                loaibenh lb ON lbpk.maloaibenh = lb.maloaibenh
            WHERE 
                pkb.mabenhnhan = :id
            ORDER BY 
                pkb.ngaykham DESC;
        `;

        const results = await sequelize.query(query, {
            replacements: { id },
            type: sequelize.QueryTypes.SELECT,
        });

        return results;
    } catch (error) {
        console.error('Error fetching patient data:', error);
        throw error;
    }
}

