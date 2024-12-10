module.exports = (sequelize, DataTypes) => {
  const taikhoan = sequelize.define('taikhoan', {
    tentaikhoan: {
      type: DataTypes.STRING(50),
      primaryKey: true,
      allowNull: false
    },
    matkhau: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'taikhoan',
    timestamps: false
  });
    
  return taikhoan;
};