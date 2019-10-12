'use strict'

var Categoria = require('../models/categoria');

//////////////////////////////////////////////
// Insertar Categoria
///////////////////////////////////////////////

function insertarCategoria(req, res) {
    var categoria = new Categoria();

    var params = req.body;
    console.log(params);
    categoria.nombre_categoria = params.nombre_categoria;
    categoria.creado_en = new Date();

    categoria.save((err, categoriaGuardada) => {
        if (err) {
            res.status(500).send({ message: 'Error al guardar la categoria.' });
        } else {
            if (!categoriaGuardada) {
                res.status(404).send({ message: 'La categoría no ha sido guardada.' });
            } else {
                res.status(200).send({ categoria: categoriaGuardada });
            }
        }
    });
}

//////////////////////////////////////////////
// Consultar Categoría por Id
///////////////////////////////////////////////

function obtenerCategoria(req, res) {
    var categoriaId = req.params.id;

    Categoria.findById(categoriaId, (err, categoria) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición.' });
        } else {
            if (!categoria) {
                res.status(404).send({ message: 'La categoría no existe.' });
            } else {
                res.status(200).send({ categoria });
            }
        }
    });
}

//////////////////////////////////////////////
// Consultar Categorías
///////////////////////////////////////////////

function obtenerCategorias(req, res) {

    Categoria.find({}, (err, categorias) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición.' });
        } else {
            if (!categorias) {
                res.status(404).send({ message: 'Las categorías no existen.' });
            } else {
                res.status(200).send({ categorias });
            }
        }
    });
}

///////////////////////////////////////////////
// Actualizar Categoría
///////////////////////////////////////////////

function actualizarCategoria(req, res) {
    var productoId = req.params.id;
    var params = req.body;
    var update = { nombre_categoria: params.nombre_categoria };
    console.log(update);

    Categoria.findByIdAndUpdate(productoId, update, (err, categoriaActualizada) => {
        if (err) {
            res.status(500).send({ message: 'Error al actualizar la categoría.' });
        } else {
            if (!categoriaActualizada) {
                res.status(404).send({ message: 'La categoría no ha sido actualizada.' });
            } else {
                res.status(200).send({ categoria: update, categoriaAnterior: categoriaActualizada });
                console.log(update);
            }
        }
    });

}

///////////////////////////////////////////////
// Eliminar Categoria
///////////////////////////////////////////////

function eliminarCategoria(req, res) {
    var categoriaId = req.params.id;

    Categoria.findByIdAndRemove(categoriaId, (err, categoriaEliminada) => {
        if (err) {
            res.status(500).send({ message: 'Error al eliminar la categoría.' });
        } else {
            if (!categoriaEliminada) {
                res.status(404).send({ message: 'La categoría no ha sido eliminada.' });
            } else {
                res.status(200).send({ categoria: categoriaEliminada });
            }
        }
    });
}

///////////////////////////////////////////////
// Insertar Subcategoria
///////////////////////////////////////////////

function insertarSubcategoria(req, res) {
    var categoriaId = req.params.id;
    var params = req.body;

    var update = { subcategoria: { nombre_subcategoria: params.nombre_subcategoria } };
    console.log(update);

    Categoria.findByIdAndUpdate(categoriaId, { $push: update }, (err, categoriaActualizada) => {
        if (err) {
            res.status(500).send({ message: 'Error al guardar la subcategoría.' });
        } else {
            if (!categoriaActualizada) {
                res.status(404).send({ message: 'La categoría no ha sido actualizada.' });
            } else {
                res.status(200).send({ subcategoria: update, categoriaAnterior: categoriaActualizada });
            }
        }
    });

}

///////////////////////////////////////////////
// Actualizar subcategoria
///////////////////////////////////////////////

function actualizarSubcategoria(req, res) {
    var categoriaId = req.params.id;
    console.log(categoriaId);

    var subcategoriaId = req.body._id;
    var subcategoriaNombre = req.body.nombre_subcategoria;
    console.log(subcategoriaId);

    var myquery = { "_id": categoriaId, "subcategoria._id": subcategoriaId };
    var newvalues = { $set: { "subcategoria.$.nombre_subcategoria": subcategoriaNombre } };

    Categoria.update(myquery, newvalues, (err, categoriaActualizada) => {
        if (err) {
            res.status(500).send({ message: 'Error al actualizar la subcategoría.' });
        } else {
            console.log(categoriaActualizada);
            if (!categoriaActualizada) {
                res.status(404).send({ message: 'La subcategoría no ha sido actualizada.' });
            } else {
                res.status(200).send({ categoria: categoriaActualizada });
            }
        }
    });
}

///////////////////////////////////////////////
// Eliminar subcategoria
///////////////////////////////////////////////

function eliminarSubcategoria(req, res) {
    var categoriaId = req.params.id;
    console.log(categoriaId);

    var subcategoriaId = req.body.json;
    console.log(subcategoriaId);

    Categoria.findByIdAndUpdate(categoriaId, { $pull: { subcategoria: { _id: subcategoriaId } } }, { new: true }, (err, categoriaEliminada) => {
        if (err) {
            res.status(500).send({ message: 'Error al eliminar la subcategoría.' });
        } else {
            if (!categoriaEliminada) {
                res.status(404).send({ message: 'La subcategoría no ha sido eliminada.' });
            } else {
                res.status(200).send({ categoria: categoriaEliminada });
            }
        }
    });
}

///////////////////////////////////////////////
// Actualizar Categoria Visible
///////////////////////////////////////////////

function actualizarCategoriaVisible(req, res) {

    var categoriaId = req.params.id;
    console.log(categoriaId);
    var params = req.body;

    var update = { visible: params.visible };
    console.log(update);

    Categoria.findByIdAndUpdate(categoriaId, update, { new: true }, (err, categoriaActualizada) => {
        if (err) {
            res.status(500).send({ message: 'Error al actualizar la categoría.' });
        } else {
            console.log(categoriaActualizada);
            if (!categoriaActualizada) {
                res.status(404).send({ message: 'La categoría no ha sido actualizada.' });
            } else {
                res.status(200).send({ categoria: categoriaActualizada });
            }
        }
    });
}

//////////////////////////////////////////////
// Consultar Categorías Visibles
///////////////////////////////////////////////

function obtenerCategoriasVisibles(req, res) {

    Categoria.find({ visible: true }, (err, categorias) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición.' });
        } else {
            if (!categorias) {
                res.status(404).send({ message: 'Las categorías no existen.' });
            } else {
                res.status(200).send({ categorias });
            }
        }
    });
}

module.exports = {
    insertarCategoria,
    obtenerCategoria,
    obtenerCategorias,
    actualizarCategoria,
    eliminarCategoria,
    insertarSubcategoria,
    actualizarSubcategoria,
    eliminarSubcategoria,
    actualizarCategoriaVisible,
    obtenerCategoriasVisibles
};