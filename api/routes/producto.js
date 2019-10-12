'use strict'

var express = require('express');
var ProductoController = require('../controllers/producto');

var api = express.Router();
//var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: '../../uploads/productos' });
var md_uploadPdf = multipart({ uploadDir: '../../uploads/pdf' });

api.post('/insertarProducto', ProductoController.insertarProducto);
api.get('/obtenerProducto/:id', ProductoController.obtenerProducto);
api.get('/buscarProductosPaginado/:termino?', ProductoController.buscarProductosPaginado);
api.put('/actualizarProducto/:id', ProductoController.actualizarProducto);
api.delete('/eliminarProducto/:id', ProductoController.eliminarProducto);
api.post('/subirImagenProducto0/:id', md_upload, ProductoController.subirImagenProducto0);
api.post('/subirImagenProducto1/:id', md_upload, ProductoController.subirImagenProducto1);
api.post('/subirImagenProducto2/:id', md_upload, ProductoController.subirImagenProducto2);
api.post('/subirImagenProducto3/:id', md_upload, ProductoController.subirImagenProducto3);
api.put('/eliminarImg1/:id', ProductoController.eliminarImg1);
api.put('/eliminarImg2/:id', ProductoController.eliminarImg2);
api.put('/eliminarImg3/:id', ProductoController.eliminarImg3);
api.put('/eliminarImg4/:id', ProductoController.eliminarImg4);
api.get('/obtenerImagenProducto/:imageFile', ProductoController.obtenerImagenProducto);
api.post('/subirPdfProducto/:id', md_uploadPdf, ProductoController.subirPdfProducto);
api.put('/insertarPromocionDescuento/:id', ProductoController.insertarPromocionDescuento);
api.put('/editarPromocionDescuento/:id', ProductoController.editarPromocionDescuento);
api.put('/eliminarPromocionDescuento/:id', ProductoController.eliminarPromocionDescuento);
api.get('/buscarProductoDescuentoPromocion/:termino?', ProductoController.buscarProductoDescuentoPromocion);
api.get('/obtenerProductosPromocion/:id', ProductoController.obtenerProductosPromocion);
api.put('/actualizarPrecioFinalEstatusInactivoPromocion/:id', ProductoController.actualizarPrecioFinalEstatusInactivoPromocion);
api.put('/actualizarPrecioFinalEstatusActivoPromocion/:id', ProductoController.actualizarPrecioFinalEstatusActivoPromocion);
api.get('/obtenerProductosCategoria/:id/:cedis?', ProductoController.obtenerProductosCategoria);
api.get('/obtenerProductoCedis/:id/:cedis?', ProductoController.obtenerProductoCedis);

module.exports = api;