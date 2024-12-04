module.exports = (sequelize, DataTypes) => {
    const CachDungThuoc = sequelize.define('CachDungThuoc', {
      MaThuoc: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'Thuoc',
          key: 'MaThuoc'
        }
      },
      MaCachDung: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'CachDung',
          key: 'MaCachDung'
        }
      }
    }, {
      tableName: 'CachDungThuoc',
      timestamps: false
    });
  
    CachDungThuoc.associate = function(models) {
      CachDungThuoc.belongsTo(models.Thuoc, {
        foreignKey: 'MaThuoc',
        targetKey: 'MaThuoc'
      });
      CachDungThuoc.belongsTo(models.CachDung, {
        foreignKey: 'MaCachDung',
        targetKey: 'MaCachDung'
      });
    };
  
    return CachDungThuoc;
  };