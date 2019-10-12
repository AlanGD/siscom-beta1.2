'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const SubcategoriaSchema = Schema({
    nombre_subcategoria: String
});

var CategoriaSchema = Schema({
    nombre_categoria: String,
    subcategoria: {
        type: [SubcategoriaSchema],
        default: undefined
    },
    visible: Boolean,
    creado_en: String
});

module.exports = mongoose.model('Categoria', CategoriaSchema);