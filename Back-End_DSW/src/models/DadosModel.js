const mongoose = require('mongoose');

// Defina o esquema do seu modelo de dados
const DataSchema = new mongoose.Schema({
  temperatura: Number,
  umidade: Number,
  dataHora: Date,
});

// Crie o modelo a partir do esquema
const DataModel = mongoose.model('Data', DataSchema);

// Exporte o modelo para que ele possa ser usado em outros arquivos
module.exports = DataModel;
