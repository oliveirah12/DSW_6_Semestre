const moment = require('moment');
const DadosModel = require('../models/DadosModel');

class StatusController {
  
  async getTemperaturaUmidade(request, response) {console.log("relatorios");
    try {
      console.log("relatorios");
      const relatorios = await knex('DadosEstufa').select('*');
      console.log(relatorios);

      response.json({ relatorios });
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "Erro ao obter temperatura e umidade" });
    }
  }
  async getStatusSistema(request, response) {
    try {
      // Lógica para obter status do sistema
      // ...

      response.json({ status });
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "Erro ao obter status do sistema" });
    }
  }

  async getDadosGrafico(request, response) {
    try {
      console.log("Dados recebidos para o gráfico:", request.body);
      const dataAtual = moment().format('YYYY-MM-DD HH:mm:ss');

      // Busque os dados do banco de dados
      const dadosDoBanco = await DadosModel.find({
        dataHora: { $gte: moment().subtract(1, 'day').toDate(), $lte: new Date(dataAtual) },
      });

      response.json({
        temperatura: dadosDoBanco.map(item => item.temperatura),
        umidade: dadosDoBanco.map(item => item.umidade),
        dataHora: dataAtual,
      });
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "Erro ao buscar dados para o gráfico" });
    }
  }
}

module.exports = new StatusController();