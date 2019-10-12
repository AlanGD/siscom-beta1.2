'use strict'

var Deseo = require('../models/deseo');

//////////////////////////////////////////////
// Insertar Deseo
///////////////////////////////////////////////

function insertarDeseo(req, res) {

    var deseo = new Deseo();

    deseo.usuario = req.params.id;
    console.log(deseo.usuario);

    var params = req.body;
    console.log(params);
    deseo.items = params;

    deseo.save((err, deseoGuardado) => {
        if (err) {
            res.status(500).send({ message: 'Error al guardar la lista de deseos.' });
        } else {
            if (!deseoGuardado) {
                res.status(404).send({ message: 'La lista de deseos no ha sido guardada.' });
            } else {
                res.status(200).send({ wishList: deseoGuardado });
            }
        }
    });
}

//////////////////////////////////////////////
// Consultar Deseo
///////////////////////////////////////////////

function consultarDeseo(req, res) {

    var usuarioId = req.params.id;
    console.log(usuarioId);

    Deseo.findOne({ usuario: usuarioId }, (err, deseo) => {
        if (err) {
            res.status(500).send({ message: 'Error al consultar el deseo.' });
        } else {
            if (!deseo) {
                res.status(200).send({ wishList: [] });
            } else {
                res.status(200).send({ wishList: deseo.items });
            }
        }
    });
}

//////////////////////////////////////////////
// Agregar Deseo
///////////////////////////////////////////////

function agregarDeseo(req, res) {

    var usuarioId = req.params.id;
    console.log(usuarioId);

    var params = req.body;
    console.log(params);


    Deseo.updateOne({ usuario: usuarioId }, { $push: { items: params } }, (err, deseoAgregado) => {
        if (err) {
            res.status(500).send({ message: 'Error al agregar el deseo.' });
        } else {
            if (!deseoAgregado) {
                res.status(404).send({ message: 'El deseo no ha sido agregado.' });
            } else {
                res.status(200).send({ wishList: deseoAgregado });
            }
        }
    });
}

//////////////////////////////////////////////
// Eliminar Deseo
///////////////////////////////////////////////

function eliminarDeseo(req, res) {

    var usuarioId = req.params.id;
    console.log(usuarioId);

    Deseo.findOneAndRemove({ usuario: usuarioId }, (err, deseoBorrado) => {
        if (err) {
            res.status(500).send({ message: 'Error al borrar el deseo.' });
        } else {
            if (!deseoBorrado) {
                res.status(404).send({ message: 'El deseo no ha sido borrado.' });
            } else {
                res.status(200).send({ wishList: deseoBorrado });
            }
        }
    });
}

//////////////////////////////////////////////
// Quitar Deseo
///////////////////////////////////////////////

function quitarDeseo(req, res) {

    var usuarioId = req.params.id;
    console.log(usuarioId);

    var params = req.body;
    console.log(params);


    Deseo.updateOne({ usuario: usuarioId }, { $set: { items: params } }, (err, deseoQuitado) => {
        if (err) {
            res.status(500).send({ message: 'Error al quitar el deseo.' });
        } else {
            if (!deseoQuitado) {
                res.status(404).send({ message: 'El deseo no ha sido quitado.' });
            } else {
                res.status(200).send({ wishList: deseoQuitado });
            }
        }
    });
}

module.exports = {
    insertarDeseo,
    consultarDeseo,
    agregarDeseo,
    eliminarDeseo,
    quitarDeseo
};