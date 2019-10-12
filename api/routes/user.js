'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/probando-controlador', md_auth.ensureAuth, UserController.pruebas);
api.post('/register', UserController.saveUser);
api.post('/registerApp', UserController.saveUserApp);
api.post('/login', UserController.loginUser);
api.post('/loginApp', UserController.loginUserApp);
api.post('/passwordRecovery', UserController.passwordRecovery);
api.put('/passwordReset/:id', UserController.passwordReset);

module.exports = api;