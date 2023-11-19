const {Model, DataTypes} = require('sequelize');
const sequelize = require("../config/db");

  class ControleIrrigacao extends Model{}

  ControleIrrigacao.init(
  {
    comando_bomba: {
      type: DataTypes.BOOLEAN,
    },
    comando_valvula: {
      type: DataTypes.BOOLEAN,
    },
    timestamp: {
      type: DataTypes.DATE
    },
  }, 
  {
    sequelize,
    modelName: 'ControleIrrigacao',
  }
);
module.exports = ControleIrrigacao
