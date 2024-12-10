module.exports = (sequelize, DataTypes) => {
  const phieukhambenh = sequelize.define('phieukhambenh', {
    maphieukham: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    ngaykham: {
      type: DataTypes.DATE,
      allowNull: false
    },
    trieuchung: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    mach: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1
      }
    },
    nhietdo: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        min: 35,
        max: 42
      }
    },
    huyetap: {
      type: DataTypes.STRING(7),
      allowNull: true
    },
    nhiptho: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1
      }
    },
   chieucao: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        min: 50,
        max: 250
      }
    },
    cannang: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        min: 3,
        max: 300
      }
    },
    lydokham: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ghichukham: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    loidan: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ngaytaikham: {
      type: DataTypes.DATE,
      allowNull: true
    },
    trangthai: {
      type: DataTypes.STRING(25),
      allowNull: false,
      validate: {
        isIn: [['chưa khám', 'đang khám', 'đã khám']]
      }
    },
    mabenhnhan: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'benhnhan',
        key: 'mabenhnhan'
      }
    },
    mabacsi: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'bacsi',
        key: 'mabacsi'
      }
    }
  }, {
    tableName: 'phieukhambenh',
    timestamps: false
  });

  phieukhambenh.associate = function(models) {
    phieukhambenh.belongsTo(models.benhnhan, {
      foreignKey: 'mabenhnhan',
      targetKey: 'mabenhnhan'
    });
    phieukhambenh.belongsTo(models.bacsi, {
      foreignKey: 'mabacsi',
      targetKey: 'mabacsi'
    });
    phieukhambenh.hasMany(models.toathuoc, {
      foreignKey: 'maphieukham'
    });
    phieukhambenh.hasMany(models.canlamsang, {
      foreignKey: 'maphieukham'
    });
    phieukhambenh.hasMany(models.loaibenhtrongphieukham, {
      foreignKey: 'maphieukham'
    });
    phieukhambenh.hasOne(models.hoadon, {
      foreignKey: 'maphieukham'
    });
  };

  return phieukhambenh;
};