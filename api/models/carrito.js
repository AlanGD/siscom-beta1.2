'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user');

var CarritoSchema = Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    cedis: String,
    creado_en: Date,
    items: Array
});

module.exports = mongoose.model('ShoppingCart', CarritoSchema);