module.exports = (sequelize, DataTypes) => {
  const cachdungthuoc = sequelize.define('cachdungthuoc', {
    mathuoc: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'thuoc',
        key: 'mathuoc'
      }
    },
    macachdung: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'cachdung',
        key: 'macachdung'
      }
    }
  }, {
    tableName: 'cachdungthuoc',
    timestamps: false
  });

  cachdungthuoc.associate = function(models) {
    cachdungthuoc.belongsTo(models.thuoc, {
      foreignKey: 'mathuoc',
      targetKey: 'mathuoc'
    });
    cachdungthuoc.belongsTo(models.cachdung, {
      foreignKey: 'macachdung',
      targetKey: 'macachdung'
    });
  };

  return cachdungthuoc;
};
