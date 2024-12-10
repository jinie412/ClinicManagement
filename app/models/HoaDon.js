module.exports = (sequelize, DataTypes) => {
  const hoadon = sequelize.define('hoadon', {
    maphieukham: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'phieukhambenh',
        key: 'maphieukham'
      },
      onDelete: 'CASCADE'
    },
    tongtien: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    tableName: 'hoadon',
    timestamps: false
  });

  hoadon.associate = function(models) {
    hoadon.belongsTo(models.phieukhambenh, {
      foreignKey: 'maphieukham',
      targetKey: 'maphieukham',
      onDelete: 'CASCADE'
    });
  };

  return hoadon;
};
