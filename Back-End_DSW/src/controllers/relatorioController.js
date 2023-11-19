const Relatorio = require("../../orm/models/relatorioModel");

module.exports = {
  async all(request, response) {
    try {
      const relatorio = await Relatorio.findAll();
      response.status(200).json(relatorio);
    } catch (error) {
      console.log(error);
      response.status(400).send(error);
    }
  },
  async create(request, response) {
    try {
      await Relatorio.create(request.body);
      response.status(200).json("Data inserted!!");
    } catch (error) {
      console.log(error);
      response.status(400).send(error);
    }
  },
  async one(request, response) {
    try {
      const id = request.params.id;
      const relatorio = await Relatorio.findOne({ where: { id } });
      if (!relatorio) {
        return response.status(400).json("Data not found");
      }
      response.status(200).json(relatorio);
    } catch (error) {
      console.log(error);
      response.status(400).send(error);
    }
  },
  async update(request, response) {
    try {
      const { data, hora, umidade, temperatura } = request.body;
      const id = request.params.id;
      const relatorio = await Relatorio.findOne({ where: { id } });

      if (!relatorio) {
        return response.status(400).json("Data not found");
      }
      relatorio.data = data;
      relatorio.hora = hora;
      relatorio.umidade = umidade;
      relatorio.temperatura = temperatura;

      await relatorio.save();
      response.status(200).json("Data uptated!!");
    } catch (error) {
      console.log(error);
      response.status(400).send(error);
    }
  },
  async delete(request,response){
    try {
      const id = request.params.id;
      const relatorio = await Relatorio.destroy({ where: { id } });
      if (!relatorio) {
        return response.status(400).json("Data not found");
      }
      response.status(200).json("Data removed!!");
    } catch (error) {
      console.log(error);
      response.status(400).send(error);
    }
  }
};
