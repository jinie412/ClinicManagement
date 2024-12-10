module.exports = (sequelize, DataTypes) => {
  const bacsi = sequelize.define('bacsi', {
    mabacsi: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    hoten: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    tinhthanhpho: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    gioitinh: {
      type: DataTypes.STRING(3),
      allowNull: true,
      validate: {
        isIn: [['nam', 'nữ']]
      }
    },
    ngaysinh: {
      type: DataTypes.DATE,
      allowNull: true
    },
    sodienthoai: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      unique: true,
      validate: {
        len: [10, 10]
      }
    },
    tentaikhoan: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      references: {
        model: 'taikhoan',
        key: 'tentaikhoan'
      }
    }
  }, {
    tableName: 'bacsi',
    timestamps: false
  });

  bacsi.associate = function(models) {
    bacsi.belongsTo(models.taikhoan, {
      foreignKey: 'tentaikhoan',
      targetKey: 'tentaikhoan'
    });
  };

  return bacsi;
};