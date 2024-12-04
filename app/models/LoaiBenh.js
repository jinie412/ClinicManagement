module.exports = (sequelize, DataTypes) => {
    const LoaiBenh = sequelize.define('LoaiBenh', {
      MaLoaiBenh: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      TenLoaiBenh: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      MoTa: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    }, {
      tableName: 'LoaiBenh',
      timestamps: false
    });
  
    return LoaiBenh;
  };