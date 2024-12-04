module.exports = (sequelize, DataTypes) => {
    const QuyDinh = sequelize.define('QuyDinh', {
      MaQuyDinh: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      SoLuongBenhNhanToiDa: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1
        }
      },
      SoLuongLoaiBenh: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1
        }
      },
      SoLuongLoaiThuoc: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1
        }
      },
      SoLuongLoaiDonVi: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1
        }
      },
      SoLuongCachDung: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1
        }
      },
      TienKham: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          min: 0.01
        }
      }
    }, {
      tableName: 'QuyDinh',
      timestamps: false
    });
  
    return QuyDinh;
  };