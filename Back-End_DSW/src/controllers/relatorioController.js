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
      const dataInicio = async () => formatarDataIsoParaString(request.query.dataInicio);
      const dataFim = async () => formatarDataIsoParaString(request.query.dataFim);
      
      const relatorios = await Relatorio.findAll({
        where: {
          data: {
            between: [new Date(dataInicio), new Date(dataFim)],
          },
        },
      });

      //request.send(`Pedido encontrado! ${dataInicio} --- ${dataFim}` );

      response.status(200).json(relatorios);
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
  async delete(request, response) {
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
  },

  
};
formatarDataIsoParaString = (dataIso) => {
  const dataObj = new Date(dataIso);
  const ano = dataObj.getFullYear();
  const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
  const dia = String(dataObj.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}