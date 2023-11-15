const connection = require('../database/connection')
const express = require('express')
const router = express.Router()
const ReportsController = require('../controllers/ReportsController')
const controlesController = require('../controllers/controlesController')

router.post('/novoRelatorio',ReportsController.novoRelatorio)

router.get('/relatorio',ReportsController.listarRelatorios)

router.get('/relatorio/:id',ReportsController.listarUmRelatorio)

router.put('/atualizar/relatorio/:id',ReportsController.atualizarRelatorio)

router.delete('/delete/relatorio/:id',ReportsController.removerRelatorio)

router.put('/ligar/controles/:id', controlesController.ligarControle)

router.put('/desligar/controles/:id', controlesController.desligarControle)

module.exports = router