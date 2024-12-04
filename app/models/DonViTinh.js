module.exports = (sequelize, DataTypes) => {
    const DonViTinh = sequelize.define('DonViTinh', {
      MaDonVi: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      TenDonVi: {
        type: DataTypes.STRING(25),
        allowNull: false,
        unique: true
      }
    }, {
      tableName: 'DonViTinh',
      timestamps: false
    });
  
    return DonViTinh;
  };