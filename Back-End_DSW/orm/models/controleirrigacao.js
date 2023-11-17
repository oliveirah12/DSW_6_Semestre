'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ControleIrrigacao extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ControleIrrigacao.init({
    estufa_id: DataTypes.INTEGER,
    comando_bomba: DataTypes.BOOLEAN,
    comando_valvula: DataTypes.BOOLEAN,
    timestamp: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'ControleIrrigacao',
  });
  return ControleIrrigacao;
};