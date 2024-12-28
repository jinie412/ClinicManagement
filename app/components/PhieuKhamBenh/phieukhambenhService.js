const {phieukhambenh, sequelize} = require('../../models/model.index');

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
    maphieukham: "medicalRecordId",
    ngaykham: "examinationDate",
    trieuchung: "symptoms",
    mach: "pulse",
    nhietdo: "temperature",
    huyetap: "bloodPressure",
    nhiptho: "respiratoryRate",
    chieucao: "height",
    cannang: "weight",
    lydokham: "reasonForExamination",
    ghichukham: "examinationNotes",
    loidan: "instructions",
    ngaytaikham: "followUpDate",
    trangthai: "status",
    mabenhnhan: "patientId",
    mabacsi: "doctorId"
};
// Eng to Viet
const keyMapEngToVi = {
    medicalRecordId: "maphieukham",
    examinationDate: "ngaykham",
    symptoms: "trieuchung",
    pulse: "mach",
    temperature: "nhietdo",
    bloodPressure: "huyetap",
    respiratoryRate: "nhiptho",
    height: "chieucao",
    weight: "cannang",
    reasonForExamination: "lydokham",
    examinationNotes: "ghichukham",
    instructions: "loidan",
    followUpDate: "ngaytaikham",
    status: "trangthai",
    patientId: "mabenhnhan",
    doctorId: "mabacsi"
};

module.exports = {
    getChanDoanByIdPhieuKham: async (id) => {
        const query = `
            SELECT
                lb.tenloaibenh
            FROM
                loaibenhtrongphieukham lbpk
            LEFT JOIN
                loaibenh lb ON lbpk.maloaibenh = lb.maloaibenh
            WHERE
                lbpk.maphieukham = :id
        `
        const results = await sequelize.query(query,{
            replacements: { id },
            type: sequelize.QueryTypes.SELECT,
        })

        return results;
    },
    getToaThuocByIdPhieuKham: async (id) => {
        const query =`
            SELECT
                tt.mathuoc,tt.soluong,
                t.tenthuoc, t.soluongnhap, t.soluongcon,t.dongia,
                dv.tendonvi,
                cd.motacachdung, cd.macachdung
            FROM
                toathuoc tt
            LEFT JOIN 
                thuoc t ON tt.mathuoc = t.mathuoc
            LEFT JOIN 
                cachdung cd ON cd.macachdung = tt.macachdung
            LEFT JOIN
                donvitinh dv ON dv.madonvi = t.madonvi
            WHERE
                tt.maphieukham = :id
        `
        const results = await sequelize.query(query, {
            replacements: { id },
            type: sequelize.QueryTypes.SELECT,
        });
        return results; 
    },
    getChiTietPhieuKham: async () => {
        const query =`
            SELECT
                pkb.maphieukham, pkb.ngaykham, pkb.trieuchung, 
                bs.hoten as tenbacsi,
                bn.mabenhnhan, bn.hoten, bn.diachi, bn.sodienthoai, bn.ngaysinh, bn.gioitinh,
                lb.tenloaibenh
            FROM
                phieukhambenh pkb
            LEFT JOIN
                benhnhan bn ON pkb.mabenhnhan = bn.mabenhnhan
            LEFT JOIN
                bacsi bs ON pkb.mabacsi = bs.mabacsi
            LEFT JOIN
                loaibenhtrongphieukham lbpk ON pkb.maphieukham = lbpk.maphieukham
            LEFT JOIN
                loaibenh lb ON lbpk.maloaibenh = lb.maloaibenh
            ORDER BY
                pkb.ngaykham DESC
        `;
        const results = await sequelize
            .query(query, {
                type: sequelize.QueryTypes.SELECT,
            });

        return results;
    },
    getPhieuKhamBenhs: async () =>{
        return await phieukhambenh.findAll();
    },
    getPhieuKhamBenhById: async(id) =>{
        return await phieukhambenh.findByPk(id);
    },
    createPhieuKhamBenh: async(data) =>{
        const t = await sequelize.transaction();
        try {
            const newRecord = await phieukhambenh.upsert(data, { transaction: t });
            await t.commit();
            return newRecord;
        } catch (error) {
            await t.rollback();
            throw error;
        }
    },
    updatePhieuKhamBenh: async(id, data) =>{
        const t = await sequelize.transaction();
        try {
            const existingPhieuKhamBenh = await phieukhambenh.findByPk(id, { transaction: t });
            if (existingPhieuKhamBenh){
                const updatedPhieuKhamBenh = await existingPhieuKhamBenh.update(data, { transaction: t });
                await t.commit();
                return updatedPhieuKhamBenh;
            }
            await t.rollback();
            return null;
        } catch (error) {
            await t.rollback();
            throw error;
        }
    },
    deletePhieuKhamBenh: async(id) =>{
        const t = await sequelize.transaction();
        try{
            const phieukhambenhRecord = await phieukhambenh.findByPk(id, {transaction: t});
            if(phieukhambenhRecord){
                const deletedPhieuKhamBenh = await phieukhambenhRecord.destroy({transaction: t});
                await t.commit();
                return deletedPhieuKhamBenh;
            }
            await t.rollback();
            return null;
        } catch(error){
            await t.rollback();
            throw error;
        }
    }
}
