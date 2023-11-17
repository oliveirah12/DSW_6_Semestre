const moment = require('moment');
const database = require("../database/knexConfig");


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
  

  

  deleteStatus(request, response){
    const id = request.params.estufa_id;

    database
        .where({ id: id })
        .table("estufas")
        .del()
        .then(() => {
          // Em seguida, excluir da segunda tabela
          return database
              .table("dadosestufa")
              .where({ estufa_id: id }) // Suponha que "id_estufa" é a chave estrangeira na tabela2
              .del();
        })
        .then(() => {
            // Em seguida, excluir da terceira tabela
            return database
                .table("controleirrigacao")
                .where({ estufa_id: id }) // Suponha que "id_estufa" é a chave estrangeira na tabela3
                .del();
        })
        .then((data) => {
            response.json({ message: "Estufa removida com sucesso" });
        })
        .catch((error) => {
            response.json(error);
        });
  }


  includeStatus(request, response){

  }

}



module.exports = new StatusController();