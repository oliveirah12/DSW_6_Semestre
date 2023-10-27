const connection = require('../database/connection')
const express = require('express')
const router = express.Router()
const ReportsController = require('../controllers/ReportsController')

router.post('/novoRelatorio',ReportsController.novoRelatorio)

router.get('/relatorio',ReportsController.listarRelatorios)

router.get('/relatorio/:id',ReportsController.listarUmRelatorio)

router.put('/atualizar/relatorio/:id',ReportsController.atualizarRelatorio)

router.delete('/delete/relatorio/:id',ReportsController.removerRelatorio)

module.exports = router