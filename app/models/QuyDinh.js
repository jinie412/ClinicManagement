module.exports = (sequelize, DataTypes) => {
  const quydinh = sequelize.define('quydinh', {
    maquydinh: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    soluongbenhnhantoida: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1
      }
    },
    soluongloaibenh: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1
      }
    },
    soluongloaithuoc: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1
      }
    },
    soluongloaidonvi: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1
      }
    },
    soluongcachdung: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1
      }
    },
    tienkham: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0.01
      }
    }
  }, {
    tableName: 'quydinh',
    timestamps: false
  });

  return quydinh;
};