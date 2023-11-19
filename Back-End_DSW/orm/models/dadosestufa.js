'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DadosEstufa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DadosEstufa.init({
    estufa_id: DataTypes.INTEGER,
    temperatura: DataTypes.DECIMAL,
    umidade: DataTypes.DECIMAL,
    consumo_agua: DataTypes.DECIMAL,
    timestamp: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'DadosEstufa',
  });
  return DadosEstufa;
};