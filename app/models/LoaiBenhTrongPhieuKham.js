module.exports = (sequelize, DataTypes) => {
    const LoaiBenhTrongPhieuKham = sequelize.define('LoaiBenhTrongPhieuKham', {
      MaPhieuKham: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'PhieuKhamBenh',
          key: 'MaPhieuKham'
        }
      },
      MaLoaiBenh: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'LoaiBenh',
          key: 'MaLoaiBenh'
        }
      }
    }, {
      tableName: 'LoaiBenhTrongPhieuKham',
      timestamps: false
    });
  
    LoaiBenhTrongPhieuKham.associate = function(models) {
      LoaiBenhTrongPhieuKham.belongsTo(models.PhieuKhamBenh, {
        foreignKey: 'MaPhieuKham',
        targetKey: 'MaPhieuKham'
      });
      LoaiBenhTrongPhieuKham.belongsTo(models.LoaiBenh, {
        foreignKey: 'MaLoaiBenh',
        targetKey: 'MaLoaiBenh'
      });
    };
  
    return LoaiBenhTrongPhieuKham;
  };