'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PromocionSchema = Schema({
    tipo: String,
    nombre: String,
    descripcion: String,
    estatus: Number,
    fecha_inicio: Date,
    fecha_fin: Date
});

module.exports = mongoose.model('Promociones', PromocionSchema);