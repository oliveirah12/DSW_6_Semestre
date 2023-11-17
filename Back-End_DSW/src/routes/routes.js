const connection = require('../database/knexConfig')
const express = require('express')
const router = express.Router()

const ReportsController = require('../controllers/ReportsController')
const controlesController = require('../controllers/controlesController')
const StatusController = require('../controllers/StatusController'); 


// Rotas para relatórios
router.post('/novoRelatorio', ReportsController.novoRelatorio);
router.get('/relatorio', ReportsController.listarRelatorios);
router.get('/relatorio/:id', ReportsController.listarUmRelatorio);
router.put('/atualizar/relatorio/:id', ReportsController.atualizarRelatorio);
router.delete('/delete/relatorio/:id', ReportsController.removerRelatorio);


// Adicione logs para mostrar as rotas configuradas

//console.log("Rotas configuradas:", router.stack.map(layer => layer.route.path));

router.delete('/delete/relatorio/:id',ReportsController.removerRelatorio)

router.put('/ligar/controles/:id', controlesController.ligarControle)
router.put('/desligar/controles/:id', controlesController.desligarControle)
router.get('/controlesIrrigacao', controlesController.listarControles)

//Rotas de Estufas
router.get('/estufas', StatusController.listarEstufas)
router.get('/sistemas', StatusController.getStatusSistema)


module.exports = router
