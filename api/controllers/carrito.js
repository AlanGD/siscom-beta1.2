'use strict'

var ShoppingCart = require('../models/carrito');

//////////////////////////////////////////////
// Insertar Carrito
///////////////////////////////////////////////

function insertarCarrito(req, res) {

    var shoppingCart = new ShoppingCart();

    shoppingCart.usuario = req.params.id;
    console.log(shoppingCart.usuario);

    var params = req.body;
    console.log(params);
    shoppingCart.cedis = params[0].cedis;
    shoppingCart.creado_en = new Date();
    shoppingCart.items = params;

    shoppingCart.save((err, carritoGuardado) => {
        if (err) {
            res.status(500).send({ message: 'Error al guardar el carrito de compras.' });
        } else {
            if (!carritoGuardado) {
                res.status(404).send({ message: 'El carrito de compras no ha sido guardado.' });
            } else {
                res.status(200).send({ shoppingCart: carritoGuardado });
            }
        }
    });
}

//////////////////////////////////////////////
// Consultar Carrito
///////////////////////////////////////////////

function consultarCarrito(req, res) {

    var usuarioId = req.params.id;
    console.log(usuarioId);

    ShoppingCart.findOne({ usuario: usuarioId }, (err, carrito) => {
        if (err) {
            res.status(500).send({ message: 'Error al consultar el carrito.' });
        } else {
            if (!carrito) {
                res.status(200).send({ shoppingCart: [] });
            } else {
                res.status(200).send({ shoppingCart: carrito.items });
            }
        }
    });
}

//////////////////////////////////////////////
// Agregar Carrito
///////////////////////////////////////////////

function agregarCarrito(req, res) {

    var usuarioId = req.params.id;
    console.log(usuarioId);

    var params = req.body;
    console.log(params);

    ShoppingCart.find({ usuario: usuarioId, "items": { $elemMatch: { "_id": params._id } } }, (err, item) => {
        if (err) {
            res.status(500).send({ message: 'Error al buscarr en el carrito.' });
        } else {
            if (!item) {
                res.status(404).send({ message: 'El item no ha sido encontrado en el carrito.' });
            } else {

                if (item.length === 0) {

                    ShoppingCart.updateOne({ usuario: usuarioId }, { $push: { items: params } }, (err, carritoAgregado) => {
                        if (err) {
                            res.status(500).send({ message: 'Error al agregar al carrito.' });
                        } else {
                            if (!carritoAgregado) {
                                res.status(404).send({ message: 'El item no ha sido agregado al carrito.' });
                            } else {
                                res.status(200).send({ shoppingCart: carritoAgregado });
                            }
                        }
                    });

                } else {

                    ShoppingCart.updateOne({ usuario: usuarioId, "items._id": params._id }, { $set: { "items.$.piezas": params.piezas } }, (err, carritoAgregado) => {
                        if (err) {
                            res.status(500).send({ message: 'Error al agregar al carrito.' });
                        } else {
                            if (!carritoAgregado) {
                                res.status(404).send({ message: 'El item no ha sido agregado al carrito.' });
                            } else {
                                res.status(200).send({ shoppingCart: carritoAgregado });
                            }
                        }
                    });

                }

            }
        }
    });

    /*if (params.piezas > 1 || params.piezas == true) {

        ShoppingCart.updateOne({ usuario: usuarioId, "items._id": params._id }, { $set: { "items.$.piezas": params.piezas } }, (err, carritoAgregado) => {
            if (err) {
                res.status(500).send({ message: 'Error al agregar al carrito.' });
            } else {
                if (!carritoAgregado) {
                    res.status(404).send({ message: 'El item no ha sido agregado al carrito.' });
                } else {
                    res.status(200).send({ shoppingCart: carritoAgregado });
                }
            }
        });

    } else {

        ShoppingCart.updateOne({ usuario: usuarioId }, { $push: { items: params } }, (err, carritoAgregado) => {
            if (err) {
                res.status(500).send({ message: 'Error al agregar al carrito.' });
            } else {
                if (!carritoAgregado) {
                    res.status(404).send({ message: 'El item no ha sido agregado al carrito.' });
                } else {
                    res.status(200).send({ shoppingCart: carritoAgregado });
                }
            }
        });

    }*/

}

//////////////////////////////////////////////
// Eliminar Carrito
///////////////////////////////////////////////

function eliminarCarrito(req, res) {

    var usuarioId = req.params.id;
    console.log(usuarioId);

    ShoppingCart.findOneAndRemove({ usuario: usuarioId }, (err, carritoBorrado) => {
        if (err) {
            res.status(500).send({ message: 'Error al borrar el carrito.' });
        } else {
            if (!carritoBorrado) {
                res.status(404).send({ message: 'El carrito no ha sido borrado.' });
            } else {
                res.status(200).send({ shoppingCart: carritoBorrado });
            }
        }
    });
}

//////////////////////////////////////////////
// Quitar Carrito
///////////////////////////////////////////////

function quitarCarrito(req, res) {

    var usuarioId = req.params.id;
    console.log(usuarioId);

    var params = req.body;
    console.log(params);

    ShoppingCart.updateOne({ usuario: usuarioId }, { $set: { items: params } }, (err, carritoQuitado) => {
        if (err) {
            res.status(500).send({ message: 'Error al quitar el items del carrito.' });
        } else {
            if (!carritoQuitado) {
                res.status(404).send({ message: 'El item del carrito no ha sido quitado.' });
            } else {
                res.status(200).send({ shoppingCart: carritoQuitado });
            }
        }
    });
}

module.exports = {
    insertarCarrito,
    consultarCarrito,
    agregarCarrito,
    eliminarCarrito,
    quitarCarrito
};