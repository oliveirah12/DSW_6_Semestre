'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Estufas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Estufas.init({
    nome: DataTypes.STRING,
    localizacao: DataTypes.STRING,
    capacidade: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Estufas',
  });
  return Estufas;
};