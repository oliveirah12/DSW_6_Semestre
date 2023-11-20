const connection = require('../database/knexConfig')
const express = require('express')
const router = express.Router()

const relatorioController = require('../controllers/relatorioController')
const controlesController = require('../controllers/controlesController')
const estufaController = require('../controllers/estufaController')
const dadosEstufaController = require('../controllers/dadosEstufaController')






// Rotas para relatórios
//router.post('/novoRelatorio', relatorioController.create);
router.get('/relatorio', relatorioController.all);
//router.get('/relatorio/:id', relatorioController.one);
//router.put('/atualizar/relatorio/:id', relatorioController.update);
//router.delete('/delete/relatorio/:id', relatorioController.delete);


//console.log("Rotas configuradas:", router.stack.map(layer => layer.route.path));
//router.delete('/delete/relatorio/:id',relatorioController.removerRelatorio)


router.put('/ligar/controles/:id', controlesController.ligarControle)
router.put('/desligar/controles/:id', controlesController.desligarControle)
router.get('/controlesIrrigacao', controlesController.listarControles)



//Rotas de Estufas
router.get('/estufas', estufaController.all)
//router.delete('/estufas/:id', StatusController.deleteStatus)
//router.post('/estufas/:id', StatusController.includeStatus)

//router.delete('/controles/:id', StatusController.deleteControles)
//router.delete('/dadosEstufa/:id', StatusController.deleteDadosEstufa)

//Rotas Dados Estufa
//router.get('/dadosEstufas', dadosEstufaController.all)

module.exports = router
