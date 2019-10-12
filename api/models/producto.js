'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Promociones = require('./promocion');

const promocionesSchema = Schema({
    _id: false,
    promocion_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Promociones
    },
    descuento: Number
});

const ItemsSchema = Schema({
    cedis: String,
    precio_final: Number,
    promociones: [{
        type: promocionesSchema,
        default: undefined
    }]
});

var ProductoSchema = Schema({
    cveproducto: String,
    descripcion_corta: String,
    dscproducto: String,
    precio_lista: Number,
    img1: Array,
    img2: Array,
    img3: Array,
    img4: Array,
    pdf: String,
    categoria: {
        type: Schema.Types.ObjectId,
        default: undefined
    },
    subcategoria: {
        type: Schema.Types.ObjectId,
        default: undefined
    },
    items: [ItemsSchema]
});

module.exports = mongoose.model('Producto', ProductoSchema);