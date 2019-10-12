'use strict'

var express = require('express');
var DeseoController = require('../controllers/deseo');

var api = express.Router();
//var md_auth = require('../middlewares/authenticated');

api.post('/insertarDeseo/:id', DeseoController.insertarDeseo);
api.get('/consultarDeseo/:id', DeseoController.consultarDeseo);
api.put('/agregarDeseo/:id', DeseoController.agregarDeseo);
api.delete('/eliminarDeseo/:id', DeseoController.eliminarDeseo);
api.put('/quitarDeseo/:id', DeseoController.quitarDeseo);

module.exports = api;