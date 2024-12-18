const {phieukhambenh} = require('../../models/model.index');
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
    getPhieuKhamBenhs: async () =>{
        return await phieukhambenh.findAll();
    },
    getPhieuKhamBenhById: async(id) =>{
        return await phieukhambenh.findByPk(id);
    },
    createPhieuKhamBenh: async(data) =>{
        return await phieukhambenh.create(data);
    },
    updatePhieuKhamBenh: async(id, data) =>{
        const existingPhieuKhamBenh = await phieukhambenh.findByPk(id);
        if(existingPhieuKhamBenh){
            return await existingPhieuKhamBenh.update(data);
        }
        return null;
    },
    deletePhieuKhamBenh: async(id) =>{
        const phieukhambenhRecord = await phieukhambenh.findByPk(id);
        if(phieukhambenhRecord){
            const deletedPhieuKhamBenh = await phieukhambenhRecord.destroy();
            return deletedPhieuKhamBenh;
        }
        return null;
    }
}
