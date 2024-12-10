module.exports = (sequelize, DataTypes) => {
  const loaibenh = sequelize.define('loaibenh', {
    maloaibenh: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    tenloaibenh: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    mota: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'loaibenh',
    timestamps: false
  });

  return loaibenh;
};