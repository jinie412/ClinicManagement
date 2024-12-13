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

const { benhnhan } = require('../../models/model.index');

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
    return benhnhans.map((bn) => renameKeys(bn.toJSON(), keyMapViToEng));
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
    const newBenhNhan = await benhnhan.create(renamedData);
    return renameKeys(newBenhNhan.toJSON(), keyMapViToEng);
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
    const bn = await benhnhan.findByPk(id);
    if (bn) {
        await bn.destroy();
        return true;
    }
    return false;
};

