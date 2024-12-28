const { where } = require('sequelize');
const { sequelize } = require('../../models/model.index');
const { thuoc, donvitinh, cachdungthuoc, cachdung, phieukhambenh, toathuoc } = require('../../models/model.index');

module.exports = {
    getThuocKhamBenhById: async (month, year) => {
        console.log('month:', month, 'year:', year);
        try {
            if (!month || isNaN(month) || month < 1 || month > 12 || !year || isNaN(year)) {
                throw new Error('Tháng hoặc năm không hợp lệ.');
            }

            const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
            console.log('startDate:', startDate);

            const endDate = `${year}-${String(month).padStart(2, '0')}-31`;
            console.log('endDate:', endDate);

            // Câu lệnh SQL thuần
            const sql = `
            SELECT
                thuoc.tenthuoc,
                SUM(toathuoc.soluong) AS tongsoluong,
                MAX(thuoc.soluongnhap) AS soluongnhap,
                MAX(thuoc.soluongcon) AS soluongcon,
                donvitinh.tendonvi AS donvithuoc
            FROM
                toathuoc
            JOIN
                thuoc ON toathuoc.mathuoc = thuoc.mathuoc
            JOIN
                donvitinh ON thuoc.madonvi = donvitinh.madonvi
            LEFT JOIN
                phieukhambenh ON toathuoc.maphieukham = phieukhambenh.maphieukham
            WHERE
                phieukhambenh.ngaykham BETWEEN :startDate AND :endDate AND phieukhambenh.tinhtrang = true
            GROUP BY
                thuoc.tenthuoc, donvitinh.tendonvi
            `;

            // Thực thi câu lệnh SQL với tham số
            const [results, metadata] = await sequelize.query(sql, {
                replacements: {
                    startDate,
                    endDate
                },
                type: sequelize.QueryTypes.SELECT
            });

            return results;
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu:', error);
            throw error;
        }
    },


    getPhieuKhamBenhs: async () => {
        return await phieukhambenh.findAll({
            attributes: ['ngaykham'],
            include: [
                {
                    model: toathuoc,
                    as: 'toathuocs',
                    attributes: ['soluong'],
                    include: [
                        {
                            model: thuoc,
                            as: 'thuoc',
                            attributes: ['tenthuoc', 'soluongnhap', 'soluongcon'],
                            include: [
                                {
                                    model: donvitinh,
                                    as: 'donvitinh',
                                    attributes: [['tendonvi', 'donvithuoc']] // Alias column
                                }
                            ], where: { tinhtrang: true }
                        }
                    ]
                }
            ],
        });
    },

    getThuocs: async () => {
        //check trinhtrang is true
        return await thuoc.findAll({
            include: [
                {
                    model: donvitinh,
                    as: 'donvitinh'
                },
                {
                    model: cachdungthuoc,
                    as: 'cachdungthuocs',
                    include: [
                        {
                            model: cachdung,
                            as: 'cachdung'
                        }
                    ]
                }
            ],
            where: {tinhtrang: true}
        });
    },
    getThuocById: async (ma) => {
        return await thuoc.findOne({
            where: {
                mathuoc: ma, 
                tinhtrang: true,
            },
        });
    },
    createThuoc: async (data) => {
        return await thuoc.upsert(data);
    },
    //delete thuoc just set tinhtrang = false
    deleteThuoc: async (id) => {
        const t = await sequelize.transaction();
        try {
            const thuocDeleted = await thuoc.update(
                { tinhtrang: false },
                { where: { mathuoc: id }, transaction: t }
            );
            await t.commit();
            return thuocDeleted;
        } catch (error) {
            await t.rollback();
            throw error;
        }
    },

    //create or update medicine
    increaseMedicine: async (data) => {
        const { tenthuoc, madonvi, soluongnhap, soluongcon, cachdungthuocs, dongia } = data;

        const t = await sequelize.transaction();
        try {
            // Create or update the medicine
            let medicine = await thuoc.findOne({ where: { tenthuoc } });
            if (medicine) {
                medicine = await medicine.update({ soluongnhap, madonvi, soluongcon, dongia }, { transaction: t });
            } else {
                medicine = await thuoc.create({ tenthuoc, madonvi, soluongnhap, soluongcon, dongia }, { transaction: t });
            }

            // Update cachdungthuocs with array of cachdungthuocs
            if (cachdungthuocs && cachdungthuocs.length > 0) {
                // Xóa tất cả các cách dùng cũ liên quan đến thuốc hiện tại
                await cachdungthuoc.destroy({
                    where: { mathuoc: medicine.mathuoc },
                    transaction : t
                });
        
                // Tạo các cách dùng mới với mathuoc và macachdung
                const newRecords = cachdungthuocs.map(macachdung => ({
                    mathuoc: medicine.mathuoc,
                    macachdung: macachdung
                }));
        
                await cachdungthuoc.bulkCreate(newRecords, { transaction : t });
            }

            await t.commit();
            return medicine;
        } catch (error) {
            await t.rollback();
            throw error;
        }
    },
    
    updateThuoc: async (data) => {
        const { mathuoc, tenthuoc, madonvi, soluongnhap, soluongcon, cachdungthuocs, dongia } = data;

        const t = await sequelize.transaction();
        try {
            // Create or update the medicine
            console.log('mathuoc: services', mathuoc);
            console.log('tenthuoc: services', tenthuoc);
            console.log('madonvi: services', madonvi);
            console.log('soluongnhap: services', soluongnhap);
            console.log('soluongcon: services', soluongcon);
            console.log('dongia: services', dongia);
            console.log('cachdungthuocs: services', cachdungthuocs);
            
            let medicine = await thuoc.findOne({ where: { mathuoc } });
            if (medicine) {
                await medicine.update(
                    { tenthuoc, soluongnhap, madonvi, soluongcon, dongia },
                    { transaction: t }
                );
            } else {
                medicine = await thuoc.create({ tenthuoc, madonvi, soluongnhap, soluongcon, dongia }, { transaction: t });
            }

            // Update cachdungthuocs with array of cachdungthuocs
            if (cachdungthuocs && cachdungthuocs.length > 0) {
                // Xóa tất cả các cách dùng cũ liên quan đến thuốc hiện tại
                await cachdungthuoc.destroy({
                    where: { mathuoc: medicine.mathuoc },
                    transaction : t
                });
        
                // Tạo các cách dùng mới với mathuoc và macachdung
                const newRecords = cachdungthuocs.map(macachdung => ({
                    mathuoc: medicine.mathuoc,
                    macachdung: macachdung
                }));
        
                await cachdungthuoc.bulkCreate(newRecords, { transaction : t });
            }

            await t.commit();
            return medicine;
        } catch (error) {
            await t.rollback();
            throw error;
        }
    },
}

