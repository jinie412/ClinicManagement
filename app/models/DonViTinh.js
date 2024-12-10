module.exports = (sequelize, DataTypes) => {
  const donvitinh = sequelize.define('donvitinh', {
    madonvi: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    tendonvi: {
      type: DataTypes.STRING(25),
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'donvitinh',
    timestamps: false
  });

  return donvitinh;
};