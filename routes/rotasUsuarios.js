var express = require('express');
var router = express.Router();
var controllerUsuarios = require('../controller/controllerUsuarios');

// Rota pública: cadastro de novo usuário
router.post('/cadastro', controllerUsuarios.cadastro);

// Rota pública: login - retorna token JWT em caso de sucesso
router.post('/login', controllerUsuarios.login);

module.exports = router;