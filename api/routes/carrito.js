'use strict'

var express = require('express');
var CarritoController = require('../controllers/carrito');

var api = express.Router();
//var md_auth = require('../middlewares/authenticated');

api.post('/insertarCarrito/:id', CarritoController.insertarCarrito);
api.get('/consultarCarrito/:id', CarritoController.consultarCarrito);
api.put('/agregarCarrito/:id', CarritoController.agregarCarrito);
api.delete('/eliminarCarrito/:id', CarritoController.eliminarCarrito);
api.put('/quitarCarrito/:id', CarritoController.quitarCarrito);

module.exports = api;