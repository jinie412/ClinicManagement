module.exports = (sequelize, DataTypes) => {
  const BacSi = sequelize.define('BacSi', {
    MaBacSi: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    HoTen: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    TinhThanhPho: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    GioiTinh: {
      type: DataTypes.STRING(3),
      allowNull: true,
      validate: {
        isIn: [['Nam', 'Nữ']]
      }
    },
    NgaySinh: {
      type: DataTypes.DATE,
      allowNull: true
    },
    SoDienThoai: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      unique: true,
      validate: {
        len: [10, 10]
      }
    },
    TenTaiKhoan: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      references: {
        model: 'TaiKhoan',
        key: 'TenTaiKhoan'
      }
    }
  }, {
    tableName: 'BacSi',
    timestamps: false
  });

  BacSi.associate = function(models) {
    BacSi.belongsTo(models.TaiKhoan, {
      foreignKey: 'TenTaiKhoan',
      targetKey: 'TenTaiKhoan'
    });
  };

  return BacSi;
};