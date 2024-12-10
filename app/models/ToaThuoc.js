module.exports = (sequelize, DataTypes) => {
  const toathuoc = sequelize.define('toathuoc', {
    maphieukham: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'phieukhambenh',
        key: 'maphieukham'
      }
    },
    mathuoc: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'thuoc',
        key: 'mathuoc'
      }
    },
    soluong: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'toathuoc',
    timestamps: false
  });

  toathuoc.associate = function(models) {
    toathuoc.belongsTo(models.phieukhambenh, {
      foreignKey: 'maphieukham',
      targetKey: 'maphieukham'
    });
    toathuoc.belongsTo(models.thuoc, {
      foreignKey: 'mathuoc',
      targetKey: 'mathuoc'
    });
  };

  return toathuoc;
};