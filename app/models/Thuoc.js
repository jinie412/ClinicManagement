module.exports = (sequelize, DataTypes) => {
  const thuoc = sequelize.define('thuoc', {
    mathuoc: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    tenthuoc: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    soluongnhap: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    soluongcon: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    dongia: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0.01
      }
    },
    madonvi: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'donvitinh',
        key: 'madonvi'
      }
    }
  }, {
    tableName: 'thuoc',
    timestamps: false
  });

  thuoc.associate = function(models) {
    thuoc.belongsTo(models.donvitinh, {
      foreignKey: 'madonvi',
      targetKey: 'madonvi'
    });
    thuoc.hasMany(models.cachdungthuoc, {
      foreignKey: 'mathuoc'
    });
    thuoc.hasMany(models.toathuoc, {
      foreignKey: 'mathuoc'
    });
  };

  return thuoc;
};