module.exports = (sequelize, DataTypes) => {
    const PhieuKhamBenh = sequelize.define('PhieuKhamBenh', {
      MaPhieuKham: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      NgayKham: {
        type: DataTypes.DATE,
        allowNull: false
      },
      TrieuChung: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      Mach: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          min: 1
        }
      },
      NhietDo: {
        type: DataTypes.FLOAT,
        allowNull: true,
        validate: {
          min: 35,
          max: 42
        }
      },
      HuyetAp: {
        type: DataTypes.STRING(7),
        allowNull: true
      },
      NhipTho: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          min: 1
        }
      },
      ChieuCao: {
        type: DataTypes.FLOAT,
        allowNull: true,
        validate: {
          min: 50,
          max: 250
        }
      },
      CanNang: {
        type: DataTypes.FLOAT,
        allowNull: true,
        validate: {
          min: 3,
          max: 300
        }
      },
      LyDoKham: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      GhiChuKham: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      LoiDan: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      NgayTaiKham: {
        type: DataTypes.DATE,
        allowNull: true
      },
      TrangThai: {
        type: DataTypes.STRING(25),
        allowNull: false,
        validate: {
          isIn: [['Chưa khám', 'Đang khám', 'Đã khám']]
        }
      },
      MaBenhNhan: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'BenhNhan',
          key: 'MaBenhNhan'
        }
      },
      MaBacSi: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'BacSi',
          key: 'MaBacSi'
        }
      }
    }, {
      tableName: 'PhieuKhamBenh',
      timestamps: false
    });
  
    PhieuKhamBenh.associate = function(models) {
      PhieuKhamBenh.belongsTo(models.BenhNhan, {
        foreignKey: 'MaBenhNhan',
        targetKey: 'MaBenhNhan'
      });
      PhieuKhamBenh.belongsTo(models.BacSi, {
        foreignKey: 'MaBacSi',
        targetKey: 'MaBacSi'
      });
      PhieuKhamBenh.hasMany(models.ToaThuoc, {
        foreignKey: 'MaPhieuKham'
      });
      PhieuKhamBenh.hasMany(models.CanLamSang, {
        foreignKey: 'MaPhieuKham'
      });
      PhieuKhamBenh.hasMany(models.LoaiBenhTrongPhieuKham, {
        foreignKey: 'MaPhieuKham'
      });
      PhieuKhamBenh.hasOne(models.HoaDon, {
        foreignKey: 'MaPhieuKham'
      });
    };
  
    return PhieuKhamBenh;
  };