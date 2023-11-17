const moment = require('moment');
const database = require("../database/knexConfig");

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
      // Coloque aqui sua lógica de consulta específica
      const dadosDoBanco = await database('DadosEstufa').select('*');

      // Formate os dados conforme necessário
      const dadosFormatados = {
        timestamp: dadosDoBanco.map(item => item.timestamp),
        umidade: dadosDoBanco.map(item => item.umidade),
        temperatura_ambiente: dadosDoBanco.map(item => item.temperatura_ambiente),
        irrigacao_ativa: dadosDoBanco.map(item => item.irrigacao_ativa),
      };

      response.json(dadosFormatados);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Erro ao buscar dados para o gráfico' });
    }
  }
}



module.exports = new StatusController();