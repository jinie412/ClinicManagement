module.exports = (sequelize, DataTypes) => {
  const loaibenhtrongphieukham = sequelize.define('loaibenhtrongphieukham', {
    maphieukham: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'phieukhambenh',
        key: 'maphieukham'
      }
    },
    maloaibenh: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'loaibenh',
        key: 'maloaibenh'
      }
    }
  }, {
    tableName: 'loaibenhtrongphieukham',
    timestamps: false
  });

  loaibenhtrongphieukham.associate = function(models) {
    loaibenhtrongphieukham.belongsTo(models.phieukhambenh, {
      foreignKey: 'maphieukham',
      targetKey: 'maphieukham',
      onDelete: 'CASCADE'
    });
    loaibenhtrongphieukham.belongsTo(models.loaibenh, {
      foreignKey: 'maloaibenh',
      targetKey: 'maloaibenh',
      onDelete: 'CASCADE',
    });
  };

  return loaibenhtrongphieukham;
};
