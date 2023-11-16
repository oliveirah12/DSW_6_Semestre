const express = require('express');
const ReportsController = require('../controllers/ReportsController');
const StatusController = require('../controllers/StatusController');

const router = express.Router();

// Rotas para relatórios
router.post('/novoRelatorio', ReportsController.novoRelatorio);
router.get('/relatorio', ReportsController.listarRelatorios);
router.get('/relatorio/:id', ReportsController.listarUmRelatorio);
router.put('/atualizar/relatorio/:id', ReportsController.atualizarRelatorio);
router.delete('/delete/relatorio/:id', ReportsController.removerRelatorio);

// Rota para buscar dados de umidade, temperatura e status do sistema
router.get('/temperatura-umidade', StatusController.getTemperaturaUmidade);
router.get('/status-sistema', StatusController.getStatusSistema);
router.get('/grafico', StatusController.getDadosGrafico);

// Adicione logs para mostrar as rotas configuradas
console.log("Rotas configuradas:", router.stack.map(layer => layer.route.path));

module.exports = router;
