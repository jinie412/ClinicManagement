module.exports = (sequelize, DataTypes) => {
    const CachDung = sequelize.define('CachDung', {
      MaCachDung: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      MoTaCachDung: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    }, {
      tableName: 'CachDung',
      timestamps: false
    });
  
    return CachDung;
  };