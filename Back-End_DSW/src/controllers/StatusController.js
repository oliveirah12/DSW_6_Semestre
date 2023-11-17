const moment = require('moment');
const DadosModel = require('../models/DadosModel');
const database = require("../database/knexConfig.js")

class StatusController {

  listarEstufas(request, response) {
    database
      .select('*')
      .table("estufas") 
      .join("DadosEstufa", "estufas.id", "=", "DadosEstufa.estufa_id")
      .then((estufas) => {
          response.json(estufas)
      })
      .catch((error) => {
          console.log(error)
      });
  } 
  

  getStatusSistema(request, response) {
    database('DadosEstufa')
      .select('*')
      .then((statusSistema) =>{
        response.json(statusSistema)
      })
      .catch((error) =>{
        console.log(error)
      })
  }

}

module.exports = new StatusController();