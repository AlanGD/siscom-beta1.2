'use strict'

var express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');

var app = express();

// cargar rutas
var user_routes = require('./routes/user');
var producto_routes = require('./routes/producto');
var categoria_routes = require('./routes/categoria');
var promocion_routes = require('./routes/promocion');
var deseo_routes = require('./routes/deseo');
var carrito_routes = require('./routes/carrito');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


// rutas base
app.use('/api', user_routes);
app.use('/api', producto_routes);
app.use('/api', categoria_routes);
app.use('/api', promocion_routes);
app.use('/api', deseo_routes);
app.use('/api', carrito_routes);

module.exports = app;