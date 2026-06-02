var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// importação do swagger-ui-express
var swagger = require('swagger-ui-express');
// importação do JSON gerado pelo swagger-autogen
var swagger_saida = require('./config/swagger_output.json');

var rotasIndex = require('./routes/rotasIndex');
var rotasDemandas = require('./routes/rotasDemandas');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// rota para a documentação Swagger, antes das demais rotas da API
app.use('/api-docs', swagger.serve, swagger.setup(swagger_saida));

app.use('/', rotasIndex);
app.use('/api/demandas/', rotasDemandas);

module.exports = app;
