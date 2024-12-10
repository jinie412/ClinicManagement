module.exports = (sequelize, DataTypes) => {
  const cachdung = sequelize.define('cachdung', {
    macachdung: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    motacachdung: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'cachdung',
    timestamps: false
  });

  return cachdung;
};
