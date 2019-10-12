'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user');

var DeseoSchema = Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    items: Array
});

module.exports = mongoose.model('Deseo', DeseoSchema);