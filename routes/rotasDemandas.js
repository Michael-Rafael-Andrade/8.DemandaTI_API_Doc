var express = require('express');
var router = express.Router();
var controllerDemandas = require('../controller/controllerDemandas.js');

// Listar / filtrar
router.get('/',
    /*
    #swagger.tags    = ['Demandas']
    #swagger.summary = 'Lista todas as demandas'
    #swagger.parameters['status'] = {
        in: 'query',
        type: 'string',
        enum: [
            'pendente',
            'em_andamento',
            'concluido'
            ],
        description: 'Filtra pelo status' 
        }
        #swagger.response[200] = {
            schema: {
                type: 'array',
                items: {
                    $ref: '#/definitions/Demanda'                  
                      
                }
            }
        }
    */
    controllerDemandas.listar
);

// Obter por id
router.get('/:id',
    /*
        #swagger.tags       = ['Demandas']
        #swagger.summary    = 'Retorna uma demanda pelo ID'
        #swagger.parameters['id'] = {
            in: 'path',
            required: true,
            type: 'integer',
            description: 'ID da demanda'
        }
        #swagger.response[200] = {
            schema: {
                $ref: '#/definitions/Demanda'
            }
        }
    */
    controllerDemandas.obter
);

// Criar
router.post('/',
    /*
        #swagger.tags       = ['Demandas']
        #swagger.summary    = 'Cria uma nova demanda'
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
                $ref: '#/definitions/NovaDemanda'
            }
        }
        #swagger.response[201] = {
            $ref: '#/definitions/Demanda'
        }
    }
    
    */
    controllerDemandas.criar
);


// Atualizar (parcial ou total)
router.put('/:id',
    /*
        #swagger.tags       = ['Demandas']
        #swagger.summary    = 'Atualiza uma demanda existente'
        #swagger.parameters['id'] = {
            in: 'path',
            required: true,
            type: 'integer',
            description: 'ID da demanda'
        }
        
        #swagger.response[200] = {
            schema: {
                $ref: '#/definitions/Demanda'
            }
        }
    
    */

    controllerDemandas.atualizar

);

// Deletar
router.delete('/:id',
    /*
        #swagger.tags       = ['Demandas']
        #swagger.summary    = 'Remove uma demanda'
        #swagger.parameters['id'] = {
            in: 'path',
            required: true,
            type: 'integer',
            description: 'ID da demanda'
        }
    */

    controllerDemandas.deletar
);

module.exports = router;