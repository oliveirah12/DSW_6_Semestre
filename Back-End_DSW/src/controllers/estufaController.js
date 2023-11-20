const Estufa = require("../../orm/models/estufaModel");
const DadosEstufa = require('../../orm/models/dadosEstufaModel');

module.exports = {
  async all(request, response) {
    try {
      const estufaComDadosEstufas = await Estufa.findAll({
        include: [
          {
            model: DadosEstufa,
            attributes: ['temperatura', 'umidade', 'consumo_agua', 'timestamp'], // Selecione os atributos que você deseja da tabela 'DadosEstufa'
          }
        ]
      });
      
      response.status(200).json(estufaComDadosEstufas);
    } catch (error) {
      console.log(error);
      response.status(400).send(error);
    }
  },
  
  async create(request, response) {
    try {
      await Estufa.create(request.body);
      response.status(200).json("Data inserted!!");
    } catch (error) {
      console.log(error);
      response.status(400).send(error);
    }
  },
  async delete(request,response){
    try {
      const id = request.params.id;
      const estufa = await Estufa.destroy({ where: { id } });
      if (!estufa) {
        return response.status(400).json("Data not found");
      }
      response.status(200).json("Data removed!!");
    } catch (error) {
      console.log(error);
      response.status(400).send(error);
    }
  }
};
