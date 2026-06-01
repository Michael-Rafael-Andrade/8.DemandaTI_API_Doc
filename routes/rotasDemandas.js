var express = require('express');
var router = express.Router();
var controllerDemandas = require('../controller/controllerDemandas.js');

// Listar / filtrar
router.get('/', controllerDemandas.listar);

// Obter por id
router.get('/:id', controllerDemandas.obter);

// Criar
router.post('/', controllerDemandas.criar);

// Atualizar (parcial ou total)
router.put('/:id', controllerDemandas.atualizar);

// Deletar
router.delete('/:id', controllerDemandas.deletar);

module.exports = router;