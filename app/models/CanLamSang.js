module.exports = (sequelize, DataTypes) => {
  const canlamsang = sequelize.define('canlamsang', {
    maphieukham: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'phieukhambenh',
        key: 'maphieukham'
      }
    },
    tencanlamsang: {
      type: DataTypes.STRING(255),
      primaryKey: true
    },
    ketqua: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'canlamsang',
    timestamps: false
  });

  canlamsang.associate = function(models) {
    canlamsang.belongsTo(models.phieukhambenh, {
      foreignKey: 'maphieukham',
      targetKey: 'maphieukham'
    });
  };

  return canlamsang;
};