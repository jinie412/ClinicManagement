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
            SUM(hd.tongtien) - (COUNT(DISTINCT pk.maphieukham) * qd.tienkham) AS doanh_thu_thuoc,
            COUNT(DISTINCT pk.maphieukham) * qd.tienkham AS doanh_thu_kham,
            SUM(hd.tongtien) AS tong_doanh_thu
        FROM 
            phieukhambenh pk
        JOIN 
            quydinh qd ON true
        JOIN 
            hoadon hd ON hd.maphieukham = pk.maphieukham
        WHERE
            pk.trangthai = 'Đã khám'
        GROUP BY 
            TO_CHAR(pk.ngaykham, 'MM-YYYY'), qd.tienkham
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
            COUNT (DISTINCT pk.maphieukham) AS so_benh_nhan,
            SUM(hd.tongtien) - (COUNT(DISTINCT pk.maphieukham) * qd.tienkham) AS doanh_thu_thuoc,
            COUNT(DISTINCT pk.maphieukham) * qd.tienkham AS doanh_thu_kham,
            SUM(hd.tongtien) AS tong_doanh_thu
        FROM 
            phieukhambenh pk
        JOIN 
            hoadon hd ON hd.maphieukham = pk.maphieukham
        JOIN 
            quydinh qd ON true
        WHERE
            pk.trangthai = 'Đã khám'
        GROUP BY 
            TO_CHAR(pk.ngaykham, 'DD-MM-YYYY'), qd.tienkham
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