module.exports = (sequelize, DataTypes) => {
    const HoaDon = sequelize.define('HoaDon', {
      MaPhieuKham: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'PhieuKhamBenh',
          key: 'MaPhieuKham'
        },
        onDelete: 'CASCADE'
      },
      TongTien: {
        type: DataTypes.FLOAT,
        allowNull: false
      }
    }, {
      tableName: 'HoaDon',
      timestamps: false
    });
  
    HoaDon.associate = function(models) {
      HoaDon.belongsTo(models.PhieuKhamBenh, {
        foreignKey: 'MaPhieuKham',
        targetKey: 'MaPhieuKham',
        onDelete: 'CASCADE'
      });
    };
  
    return HoaDon;
  };