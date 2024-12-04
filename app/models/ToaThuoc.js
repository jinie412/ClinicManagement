module.exports = (sequelize, DataTypes) => {
    const ToaThuoc = sequelize.define('ToaThuoc', {
      MaPhieuKham: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'PhieuKhamBenh',
          key: 'MaPhieuKham'
        }
      },
      MaThuoc: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'Thuoc',
          key: 'MaThuoc'
        }
      },
      SoLuong: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      tableName: 'ToaThuoc',
      timestamps: false
    });
  
    ToaThuoc.associate = function(models) {
      ToaThuoc.belongsTo(models.PhieuKhamBenh, {
        foreignKey: 'MaPhieuKham',
        targetKey: 'MaPhieuKham'
      });
      ToaThuoc.belongsTo(models.Thuoc, {
        foreignKey: 'MaThuoc',
        targetKey: 'MaThuoc'
      });
    };
  
    return ToaThuoc;
  };