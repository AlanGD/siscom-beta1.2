'use strict'

var Promociones = require('../models/promocion');

//////////////////////////////////////////////
// Insertar Promoción
///////////////////////////////////////////////

function insertarPromocion(req, res) {

    var promocion = new Promociones();

    var params = req.body;
    console.log(params);
    promocion.tipo = 'Descuento x Item';
    promocion.nombre = params.nombre;
    promocion.descripcion = params.descripcion;
    promocion.estatus = params.estatus;
    promocion.fecha_inicio = params.fecha_inicio;
    promocion.fecha_fin = params.fecha_fin;

    promocion.save((err, promocionGuardada) => {
        if (err) {
            res.status(500).send({ message: 'Error al guardar la promocion.' });
        } else {
            if (!promocionGuardada) {
                res.status(404).send({ message: 'La promocion no ha sido guardada.' });
            } else {
                res.status(200).send({ promocion: promocionGuardada });
            }
        }
    });

}

//////////////////////////////////////////////
// Consultar Promociones
///////////////////////////////////////////////

function buscarDescuentoPromocion(req, res) {

    let termino = req.params.termino;
    let regex = new RegExp(termino, 'i');

    var query = { $or: [{ nombre: regex }, { descripcion: regex }] };

    Promociones.find(query, (err, promociones) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición.' });
        } else {
            if (!promociones) {
                res.status(404).send({ message: 'Las promociones no existen.' });
            } else {
                res.status(200).send({ promociones });
            }
        }
    });
}

//////////////////////////////////////////////
// Consultar Promoción por Id
///////////////////////////////////////////////

function obtenerPromocion(req, res) {
    var promocionId = req.params.id;

    Promociones.findById(promocionId, (err, promocion) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición.' });
        } else {
            if (!promocion) {
                res.status(404).send({ message: 'La promoción no existe.' });
            } else {
                res.status(200).send({ promocion });
            }
        }
    });
}

///////////////////////////////////////////////
// Actualizar Promocion
///////////////////////////////////////////////

function actualizarPromocion(req, res) {

    var params = req.body;
    var promocionId = params._id;
    var update = { nombre: params.nombre, descripcion: params.descripcion, estatus: params.estatus, fecha_inicio: params.fecha_inicio, fecha_fin: params.fecha_fin };

    Promociones.findByIdAndUpdate(promocionId, update, { new: true }, (err, promocionActualizada) => {
        if (err) {
            res.status(500).send({ message: 'Error al actualizar la promoción.' });
        } else {
            if (!promocionActualizada) {
                res.status(404).send({ message: 'La promoción no ha sido actualizada' });
            } else {
                res.status(200).send({ promocionActualizada });
            }
        }
    });

}

module.exports = {
    insertarPromocion,
    buscarDescuentoPromocion,
    obtenerPromocion,
    actualizarPromocion
};