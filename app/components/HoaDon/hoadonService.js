const { hoadon,phieukhambenh,toathuoc,thuoc } = require('../../models/model.index');
const { sequelize } = require('../../models/model.index');

module.exports = {
    getHoaDons: async () => {
        return await hoadon.findAll();
    },
    getHoaDonById: async (id) => {
        return await hoadon.findByPk(id);
    },
    createHoaDon: async (data) => {
        return await hoadon.upsert(data);
    },
    updateHoaDon: async (id, data) => {
        const hoadon = await hoadon.findByPk(id);
        if (hoadon) {
            return await hoadon.update(data);
        }
        return null;
    },
    deleteHoaDon: async (id) => {
        const hoadon = await hoadon.findByPk(id);
        if (hoadon) {
            await hoadon.destroy();
            return true;
        }
        return false;
    },
    //get doanh thu with date, return total money, tien thuoc, tien kham
    getDoanhThu: async () => {
        const query = `
        SELECT 
            TO_CHAR(pk.ngaykham, 'MM-YYYY') AS thang_nam,
            SUM(tt.soluong * t.dongia) AS doanh_thu_thuoc,
            SUM(qd.tienkham) AS doanh_thu_kham,
            SUM(tt.soluong * t.dongia) + SUM(qd.tienkham) AS tong_doanh_thu
        FROM 
            phieukhambenh pk
        JOIN 
            toathuoc tt ON pk.maphieukham = tt.maphieukham
        CROSS JOIN
            quydinh qd
        JOIN 
            thuoc t ON tt.mathuoc = t.mathuoc
        GROUP BY 
            TO_CHAR(pk.ngaykham, 'MM-YYYY')
        ORDER BY 
            TO_CHAR(pk.ngaykham, 'MM-YYYY');
        `;
    
        try {
            const [results] = await sequelize.query(query);
            return results;
        } catch (error) {
            console.error('Error executing query:', error);
            throw error;
        }
    },

    getDoanhThuByDay : async () => {
        const query = `
            SELECT 
            TO_CHAR(pk.ngaykham, 'DD-MM-YYYY') AS ngay_thang_nam,
            COUNT(pk.mabenhnhan) AS so_benh_nhan,
            SUM(tt.soluong * t.dongia) AS doanh_thu_thuoc,
            SUM(qd.tienkham) AS doanh_thu_kham,
            SUM(tt.soluong * t.dongia) + SUM(qd.tienkham) AS tong_doanh_thu
        FROM 
            phieukhambenh pk
        JOIN 
            toathuoc tt ON pk.maphieukham = tt.maphieukham
        JOIN 
            thuoc t ON tt.mathuoc = t.mathuoc
        CROSS JOIN
            quydinh qd
        GROUP BY 
            TO_CHAR(pk.ngaykham, 'DD-MM-YYYY')
        ORDER BY 
            TO_CHAR(pk.ngaykham, 'DD-MM-YYYY');
        `;
    
        try {
            const [results] = await sequelize.query(query);
            return results;
        } catch (error) {
            console.error('Error executing query:', error);
            throw error;
        }
    }
}