var express = require('express');
var router = express.Router();
const controllerIndex = require('../controller/controllerIndex.js');

/* GET home page */
router.get('/', controllerIndex.index);

/* Página serviços */
router.get('/servicos', controllerIndex.lista_servicos);

module.exports = router;
