const {phieukhambenh, sequelize} = require('../../models/model.index');
const cachdungthuocController = require('../CachDungThuoc/cachdungthuocController');
// const { get } = require('./phieukhambenhRouter');

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
    getToaThuocByIdPhieuKham: async (id) => {
        const query =`
            SELECT
                tt.mathuoc,tt.soluong,
                t.tenthuoc,
                dv.tendonvi,
                cd.motacachdung
            FROM
                toathuoc tt
            LEFT JOIN 
                thuoc t ON tt.mathuoc = t.mathuoc
            LEFT JOIN 
                cachdungthuoc cdt ON tt.mathuoc = cdt.mathuoc
            LEFT JOIN 
                cachdung cd ON cdt.macachdung = cd.macachdung
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
    getPhieuKhamBenhs: async () =>{
        return await phieukhambenh.findAll();
    },
    getPhieuKhamBenhById: async(id) =>{
        return await phieukhambenh.findByPk(id);
    },
    createPhieuKhamBenh: async(data) =>{
        const t = await sequelize.transaction();
        try {
            const newRecord = await phieukhambenh.create(data, { transaction: t });
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
