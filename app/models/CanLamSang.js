module.exports = (sequelize, DataTypes) => {
    const CanLamSang = sequelize.define('CanLamSang', {
      MaPhieuKham: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'PhieuKhamBenh',
          key: 'MaPhieuKham'
        }
      },
      TenCanLamSang: {
        type: DataTypes.STRING(255),
        primaryKey: true
      },
      KetQua: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    }, {
      tableName: 'CanLamSang',
      timestamps: false
    });
  
    CanLamSang.associate = function(models) {
      CanLamSang.belongsTo(models.PhieuKhamBenh, {
        foreignKey: 'MaPhieuKham',
        targetKey: 'MaPhieuKham'
      });
    };
  
    return CanLamSang;
  };