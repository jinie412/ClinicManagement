module.exports = (sequelize, DataTypes) => {
    const Thuoc = sequelize.define('Thuoc', {
      MaThuoc: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      TenThuoc: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      SoLuongNhap: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0
        }
      },
      SoLuongCon: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0
        }
      },
      DonGia: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          min: 0.01
        }
      },
      MaDonVi: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'DonViTinh',
          key: 'MaDonVi'
        }
      }
    }, {
      tableName: 'Thuoc',
      timestamps: false
    });
  
    Thuoc.associate = function(models) {
      Thuoc.belongsTo(models.DonViTinh, {
        foreignKey: 'MaDonVi',
        targetKey: 'MaDonVi'
      });
      Thuoc.hasMany(models.CachDungThuoc, {
        foreignKey: 'MaThuoc'
      });
      Thuoc.hasMany(models.ToaThuoc, {
        foreignKey: 'MaThuoc'
      });
    };
  
    return Thuoc;
  };