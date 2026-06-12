var express = require('express');
var router = express.Router();
var controllerUsuarios = require('../controller/controllerUsuarios');

// Rota pública: cadastro de novo usuário
router.post('/cadastro', 
    /*
    #swagger.tags = ['Usuarios']
    #swagger.summary = 'Cadastra um novo usuário'
    #swagger.parametes['body'] = { in: 'body', required: true, schema: { $ref: '#/definitions/NovoUsuario'}}
    #swagger.responses[201] = { schema: { $ref: '#/definitions/UsuarioCriado' }}
    #swagger.responses[400] = { description: 'Dados inválidos ou e-mail já cadastrado' }
    */
    controllerUsuarios.cadastro);

// Rota pública: login - retorna token JWT em caso de sucesso
router.post('/login', 
    /*
    #swagger.tags = ['Usuarios']
    #swagger.summary = 'Autentica o usuário e retorna um token JWT'
    #swagger.parameters['body'] = { in: 'body', required: true, schema: { $ref: '#/definitions/LoginUsuario' }}
    #swagger.responses[401] = { description: 'Credenciais inválidas' }
    */

    controllerUsuarios.login
);

module.exports = router;