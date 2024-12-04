module.exports = (sequelize, DataTypes) => {
    const BenhNhan = sequelize.define('BenhNhan', {
      MaBenhNhan: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      HoTen: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      GioiTinh: {
        type: DataTypes.STRING(3),
        allowNull: false,
        validate: {
          isIn: [['Nam', 'Nữ']]
        }
      },
      DiaChi: {
        type: DataTypes.STRING(200),
        allowNull: false
      },
      NgaySinh: {
        type: DataTypes.DATE,
        allowNull: false
      },
      NgheNghiep: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      DanToc: {
        type: DataTypes.STRING(20),
        allowNull: true
      },
      SoDienThoai: {
        type: DataTypes.CHAR(10),
        allowNull: true,
        validate: {
          len: [10, 10]
        }
      },
      TienSu: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      DiUng: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      GhiChu: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    }, {
      tableName: 'BenhNhan',
      timestamps: false
    });
  
    BenhNhan.associate = function(models) {
      BenhNhan.hasMany(models.PhieuKhamBenh, {
        foreignKey: 'MaBenhNhan'
      });
    };
  
    return BenhNhan;
  };