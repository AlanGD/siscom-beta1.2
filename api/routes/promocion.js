'use strict'

var express = require('express');
var PromocionController = require('../controllers/promocion');

var api = express.Router();
//var md_auth = require('../middlewares/authenticated');

api.post('/insertarPromocion', PromocionController.insertarPromocion);
api.get('/buscarDescuentoPromocion/:termino?', PromocionController.buscarDescuentoPromocion);
api.get('/obtenerPromocion/:id', PromocionController.obtenerPromocion);
api.put('/actualizarPromocion', PromocionController.actualizarPromocion);

module.exports = api;