var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var rotasIndex = require('./routes/rotasIndex');
var rotasDemandas = require('./routes/rotasDemandas');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', rotasIndex);
app.use('/api/demandas/', rotasDemandas);

module.exports = app;
