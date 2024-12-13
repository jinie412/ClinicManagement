const { on } = require("nodemon");

module.exports = (sequelize, DataTypes) => {
  const benhnhan = sequelize.define('benhnhan', {
    mabenhnhan: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    hoten: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    gioitinh: {
      type: DataTypes.STRING(3),
      allowNull: false,
      validate: {
        isIn: [['Nam', 'Nữ']]
      }
    },
    diachi: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    ngaysinh: {
      type: DataTypes.DATE,
      allowNull: false
    },
    nghenghiep: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    dantoc: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    sodienthoai: {
      type: DataTypes.CHAR(10),
      allowNull: true,
      validate: {
        len: [10, 10]
      }
    },
    tiensu: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    diung: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ghichu: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'benhnhan',
    timestamps: false
  });

  benhnhan.associate = function(models) {
    benhnhan.hasMany(models.phieukhambenh, {
      foreignKey: 'mabenhnhan',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };

  return benhnhan;
};