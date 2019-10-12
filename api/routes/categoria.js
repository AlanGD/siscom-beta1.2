'use strict'

var express = require('express');
var CategoriaController = require('../controllers/categoria');

var api = express.Router();
//var md_auth = require('../middlewares/authenticated');

api.post('/insertarCategoria', CategoriaController.insertarCategoria);
api.get('/obtenerCategoria/:id', CategoriaController.obtenerCategoria);
api.get('/obtenerCategorias', CategoriaController.obtenerCategorias);
api.put('/actualizarCategoria/:id', CategoriaController.actualizarCategoria);
api.delete('/eliminarCategoria/:id', CategoriaController.eliminarCategoria);
api.put('/insertarSubcategoria/:id', CategoriaController.insertarSubcategoria);
api.put('/actualizarSubcategoria/:id', CategoriaController.actualizarSubcategoria);
api.put('/eliminarSubcategoria/:id', CategoriaController.eliminarSubcategoria);
api.put('/actualizarCategoriaVisible/:id', CategoriaController.actualizarCategoriaVisible);
api.get('/obtenerCategoriasVisibles', CategoriaController.obtenerCategoriasVisibles);

module.exports = api;