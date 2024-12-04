module.exports = (sequelize, DataTypes) => {
    const TaiKhoan = sequelize.define('TaiKhoan', {
      TenTaiKhoan: {
        type: DataTypes.STRING(50),
        primaryKey: true,
        allowNull: false
      },
      MatKhau: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      Email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
      }
    }, {
      tableName: 'TaiKhoan',
      timestamps: false
    });
      
    return TaiKhoan;
  };