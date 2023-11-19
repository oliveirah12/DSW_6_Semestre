const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

class Relatorio extends Model {}

Relatorio.init(
  {
    data: {
      type: DataTypes.STRING,
    },
    hora: {
      type: DataTypes.TIME,
    },
    umidade: {
      type: DataTypes.DECIMAL,
    },
    temperatura: {
      type: DataTypes.DECIMAL,
    },
  },
  {
    sequelize,
    modelName: "relatorios",
    timestamps: false 
  }
);

module.exports = Relatorio