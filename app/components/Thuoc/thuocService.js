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
                phieukhambenh.ngaykham BETWEEN :startDate AND :endDate
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
                            ]
                        }
                    ]
                }
            ],
        });
    },

        getThuocs: async () => {
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
                ]
            });
        },
            getThuocById: async (id) => {
                return await thuoc.findByPk(id);
            },
                createThuoc: async (data) => {
                    return await thuoc.create(data);
                },
                    updateThuoc: async (id, data) => {
                        const thuoc = await thuoc.findByPk(id);
                        if (thuoc) {
                            return await thuoc.update(data);
                        }
                        return null;
                    },
                        deleteThuoc: async (id) => {
                            const thuoc = await thuoc.findByPk(id);
                            if (thuoc) {
                                await thuoc.destroy();
                                return true;
                            }
                            return false;
                        }
}

