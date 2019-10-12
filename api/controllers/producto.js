'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Producto = require('../models/producto');
var Promociones = require('../models/promocion');

//////////////////////////////////////////////
// Insertar Producto
///////////////////////////////////////////////

function insertarProducto(req, res) {
    var producto = new Producto();

    var params = req.body;
    producto.clave_producto = params.clave_producto;
    producto.descripcion_corta = params.descripcion_corta;
    producto.descripcion_larga = params.descripcion_larga;
    producto.img1 = '';
    producto.pdf = '';
    producto.creado_en = new Date();
    producto.actualizado_en = new Date();

    producto.save((err, productoAlmacenado) => {
        if (err) {
            res.status(500).send({ message: 'Error al guardar el producto.' });
        } else {
            if (!productoAlmacenado) {
                res.status(404).send({ message: 'El producto no ha sido guardado.' });
            } else {
                res.status(200).send({ producto: productoAlmacenado });
            }
        }
    });
}

///////////////////////////////////////////////
// Buscar/Consultar - Productos Paginado
///////////////////////////////////////////////

function buscarProductosPaginado(req, res) {

    let termino = req.params.termino;
    let regex = new RegExp(termino, 'i');

    Producto.find({ $or: [{ cveproducto: regex }, { descripcion_corta: regex }, { dscproducto: regex }] }, function(err, productos) {
        if (err) {
            res.status(500).send({ message: 'Error en la petición.' });
        } else {
            if (!productos) {
                res.status(404).send({ message: 'No hay productos.' });
            } else {

                return res.status(200).send({
                    productos: productos
                });

            }
        }
    }).sort('cveproducto');

}

//////////////////////////////////////////////
// Consultar Producto por Id
///////////////////////////////////////////////

function obtenerProducto(req, res) {
    var productoId = req.params.id;

    Producto.findById(productoId, (err, producto) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!producto) {
                res.status(404).send({ message: 'El producto no existe.' });
            } else {
                res.status(200).send({ producto });
            }
        }
    });
}

///////////////////////////////////////////////
// Actualizar Producto
///////////////////////////////////////////////

function actualizarProducto(req, res) {
    var productoId = req.params.id;
    //var update = req.body;
    var update = { cveproducto: req.body.cveproducto, descripcion_corta: req.body.descripcion_corta, dscproducto: req.body.dscproducto, precio: req.body.precio_lista, categoria: req.body.categoria, subcategoria: req.body.subcategoria };

    Producto.findByIdAndUpdate(productoId, update, (err, productoActualizado) => {
        if (err) {
            res.status(500).send({ message: 'Error al actualizar el producto.' });
        } else {
            if (!productoActualizado) {
                res.status(404).send({ message: 'El producto no ha sido actualizado' });
            } else {
                res.status(200).send({ producto: update, productoAnterior: productoActualizado });
            }
        }
    });

}

///////////////////////////////////////////////
// Eliminar Producto
///////////////////////////////////////////////

function eliminarProducto(req, res) {
    var productoId = req.params.id;

    Producto.findByIdAndRemove(productoId, (err, productoEliminado) => {
        if (err) {
            res.status(500).send({ message: 'Error al eliminar el producto.' });
        } else {
            if (!productoEliminado) {
                res.status(404).send({ message: 'El producto no ha sido eliminado' });
            } else {
                res.status(200).send({ producto: productoEliminado });
            }
        }
    });
}

///////////////////////////////////////////////
// Subir Imagen del Producto 1
///////////////////////////////////////////////

function subirImagenProducto0(req, res) {
    var productoId = req.params.id;
    var file_name = 'No subido...';

    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('/');
        var file_name = file_split[4];

        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif') {

            Producto.findByIdAndUpdate(productoId, { $push: { img1: file_name } }, (err, productoActualizado) => {
                if (err) {
                    res.status(500).send({ message: 'Error en la petición' });
                } else {
                    if (!productoActualizado) {
                        res.status(404).send({ message: 'No se ha podido actualizar el producto.' });
                    } else {

                        res.status(200).send({ producto: productoActualizado });

                    }
                }
            });

        } else {
            res.status(404).send({ message: 'Extensión del archivo no válida.' });
        }
    } else {
        res.status(404).send({ message: 'No has subido ninguna imagen...' });
    }
}

///////////////////////////////////////////////
// Subir Imagen del Producto 2
///////////////////////////////////////////////

function subirImagenProducto1(req, res) {
    var productoId = req.params.id;
    var file_name = 'No subido...';

    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('/');
        var file_name = file_split[4];

        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif') {

            Producto.findByIdAndUpdate(productoId, { $push: { img2: file_name } }, (err, productoActualizado) => {
                if (err) {
                    res.status(500).send({ message: 'Error en la petición' });
                } else {
                    if (!productoActualizado) {
                        res.status(404).send({ message: 'No se ha podido actualizar el producto.' });
                    } else {

                        res.status(200).send({ producto: productoActualizado });

                    }
                }
            });

        } else {
            res.status(404).send({ message: 'Extensión del archivo no válida.' });
        }
    } else {
        res.status(404).send({ message: 'No has subido ninguna imagen...' });
    }
}

///////////////////////////////////////////////
// Subir Imagen del Producto 3
///////////////////////////////////////////////

function subirImagenProducto2(req, res) {
    var productoId = req.params.id;
    var file_name = 'No subido...';

    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('/');
        var file_name = file_split[4];

        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif') {

            Producto.findByIdAndUpdate(productoId, { $push: { img3: file_name } }, (err, productoActualizado) => {
                if (err) {
                    res.status(500).send({ message: 'Error en la petición' });
                } else {
                    if (!productoActualizado) {
                        res.status(404).send({ message: 'No se ha podido actualizar el producto.' });
                    } else {

                        res.status(200).send({ producto: productoActualizado });

                    }
                }
            });

        } else {
            res.status(404).send({ message: 'Extensión del archivo no válida.' });
        }
    } else {
        res.status(404).send({ message: 'No has subido ninguna imagen...' });
    }
}

///////////////////////////////////////////////
// Subir Imagen del Producto 4
///////////////////////////////////////////////

function subirImagenProducto3(req, res) {
    var productoId = req.params.id;
    var file_name = 'No subido...';

    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('/');
        var file_name = file_split[4];

        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif') {

            Producto.findByIdAndUpdate(productoId, { $push: { img4: file_name } }, (err, productoActualizado) => {
                if (err) {
                    res.status(500).send({ message: 'Error en la petición' });
                } else {
                    if (!productoActualizado) {
                        res.status(404).send({ message: 'No se ha podido actualizar el producto.' });
                    } else {

                        res.status(200).send({ producto: productoActualizado });

                    }
                }
            });

        } else {
            res.status(404).send({ message: 'Extensión del archivo no válida.' });
        }
    } else {
        res.status(404).send({ message: 'No has subido ninguna imagen...' });
    }
}

///////////////////////////////////////////////
// Eliminar Imagen 1 del Producto
///////////////////////////////////////////////

function eliminarImg1(req, res) {
    var productoId = req.params.id;

    Producto.findByIdAndUpdate(productoId, { $unset: { img1: "" } }, (err, productoActualizado) => {
        if (!productoActualizado) {
            res.status(404).send({ message: 'No se ha podido actualizar el producto.' });
        } else if (productoActualizado.img1.length > 0) {

            for (let index = 0; index < productoActualizado.img1.length; index++) {

                var imagenArchivo = productoActualizado.img1[index];
                var pathImagen = '../../uploads/productos/' + imagenArchivo;

                console.log('Nombre: ' + imagenArchivo);
                console.log('Ruta: ' + pathImagen);

                if (fs.existsSync(pathImagen)) {
                    fs.unlinkSync(pathImagen);
                }

            }

            res.status(200).send({ producto: productoActualizado });

        } else {
            res.status(200).send({ producto: productoActualizado });
        }
    });

}

///////////////////////////////////////////////
// Eliminar Imagen 2 del Producto
///////////////////////////////////////////////

function eliminarImg2(req, res) {
    var productoId = req.params.id;

    Producto.findByIdAndUpdate(productoId, { $unset: { img2: "" } }, (err, productoActualizado) => {
        if (!productoActualizado) {
            res.status(404).send({ message: 'No se ha podido actualizar el producto.' });
        } else if (productoActualizado.img2.length > 0) {

            for (let index = 0; index < productoActualizado.img2.length; index++) {

                var imagenArchivo = productoActualizado.img2[index];
                var pathImagen = '../../uploads/productos/' + imagenArchivo;

                console.log('Nombre: ' + imagenArchivo);
                console.log('Ruta: ' + pathImagen);

                if (fs.existsSync(pathImagen)) {
                    fs.unlinkSync(pathImagen);
                }

            }

            res.status(200).send({ producto: productoActualizado });

        } else {
            res.status(200).send({ producto: productoActualizado });
        }
    });

}

///////////////////////////////////////////////
// Eliminar Imagen 3 del Producto
///////////////////////////////////////////////

function eliminarImg3(req, res) {
    var productoId = req.params.id;

    Producto.findByIdAndUpdate(productoId, { $unset: { img3: "" } }, (err, productoActualizado) => {
        if (!productoActualizado) {
            res.status(404).send({ message: 'No se ha podido actualizar el producto.' });
        } else if (productoActualizado.img3.length > 0) {

            for (let index = 0; index < productoActualizado.img3.length; index++) {

                var imagenArchivo = productoActualizado.img3[index];
                var pathImagen = '../../uploads/productos/' + imagenArchivo;

                console.log('Nombre: ' + imagenArchivo);
                console.log('Ruta: ' + pathImagen);

                if (fs.existsSync(pathImagen)) {
                    fs.unlinkSync(pathImagen);
                }

            }

            res.status(200).send({ producto: productoActualizado });

        } else {
            res.status(200).send({ producto: productoActualizado });
        }
    });

}

///////////////////////////////////////////////
// Eliminar Imagen 4 del Producto
///////////////////////////////////////////////

function eliminarImg4(req, res) {
    var productoId = req.params.id;

    Producto.findByIdAndUpdate(productoId, { $unset: { img4: "" } }, (err, productoActualizado) => {
        if (!productoActualizado) {
            res.status(404).send({ message: 'No se ha podido actualizar el producto.' });
        } else if (productoActualizado.img4.length > 0) {

            for (let index = 0; index < productoActualizado.img4.length; index++) {

                var imagenArchivo = productoActualizado.img4[index];
                var pathImagen = '../../uploads/productos/' + imagenArchivo;

                console.log('Nombre: ' + imagenArchivo);
                console.log('Ruta: ' + pathImagen);

                if (fs.existsSync(pathImagen)) {
                    fs.unlinkSync(pathImagen);
                }

            }

            res.status(200).send({ producto: productoActualizado });

        } else {
            res.status(200).send({ producto: productoActualizado });
        }
    });

}

///////////////////////////////////////////////
// Obtener Imagen del Producto
///////////////////////////////////////////////

function obtenerImagenProducto(req, res) {
    var imageFile = req.params.imageFile;
    var path_file = '../../uploads/productos/' + imageFile;
    fs.exists(path_file, function(exists) {
        if (exists) {
            res.sendFile(path.resolve(path_file));
        } else {
            res.status(200).send({ message: 'No existe la imagen...' });
        }
    });
}

///////////////////////////////////////////////
// Subir Pdf del Producto
///////////////////////////////////////////////

function subirPdfProducto(req, res) {
    var productoId = req.params.id;
    var file_name = 'No subido...';

    if (req.files) {
        console.log(req.files);
        var file_path = req.files.pdf.path;
        console.log(file_path);
        var file_split = file_path.split('/');
        console.log(file_split);
        var file_name = file_split[4];
        console.log(file_name);

        var ext_split = file_name.split('\.');
        console.log(ext_split);
        var file_ext = ext_split[1];
        console.log(file_ext);

        if (file_ext == 'pdf') {
            Producto.findByIdAndUpdate(productoId, { pdf: file_name }, (err, productoActualizado) => {
                console.log(productoActualizado);
                if (!productoActualizado) {
                    res.status(404).send({ message: 'No se ha podido actualizar el producto.' });
                } else if (productoActualizado.pdf) {

                    // Borrar Pdf
                    Producto.findByIdAndUpdate(productoId, { pdf: '' }, (err, borrarsSetImg1) => {

                        var pdfArchivo = productoActualizado.pdf;
                        var pathPdf = '../../uploads/pdf/' + pdfArchivo;

                        console.log('Nombre: ' + pdfArchivo);
                        console.log('Ruta: ' + pathPdf);

                        if (fs.existsSync(pathPdf)) {
                            fs.unlinkSync(pathPdf);
                        }

                    });

                    // Insertar nuevo Array pdf
                    Producto.findByIdAndUpdate(productoId, { pdf: file_name }, (err, productoActualizado) => {
                        if (!productoActualizado) {
                            res.status(404).send({ message: 'No se ha podido guardar el PDF.' });
                        } else {
                            res.status(200).send({ producto: productoActualizado });
                        }
                    });

                } else {
                    res.status(200).send({ producto: productoActualizado });
                }
            });
        } else {
            res.status(404).send({ message: 'Extensión del archivo no válida.' });
        }
    } else {
        res.status(404).send({ message: 'No has subido ningún PDF...' });
    }
}

///////////////////////////////////////////////
// Insertar Promoción - Descuento
///////////////////////////////////////////////

/*function insertarPromocionDescuento(req, res) {
    var productoId = req.params.id;
    var params = req.body;
    var cedis = params.cedis;

    var myquery = { "_id": productoId, "items.cedis": cedis };

    var update = { $set: { "items.$.precio_final": params.precio_final, "items.$.descuento_porcentaje": params.descuento_porcentaje, "items.$.descuento_fecha_inicio": params.descuento_fecha_inicio, "items.$.descuento_fecha_fin": params.descuento_fecha_fin } };;

    Producto.findOneAndUpdate(myquery, update, (err, productoActualizado) => {
        if (err) {
            res.status(500).send({ message: 'Error al guardar la promocion - descuento.' });
        } else {
            if (!productoActualizado) {
                res.status(404).send({ message: 'El producto no ha sido actualizado.' });
            } else {
                res.status(200).send({ descuento_promocion: update, producto: productoActualizado });
            }
        }
    });

}*/

///////////////////////////////////////////////
// Insertar Promoción - Descuento
///////////////////////////////////////////////

function insertarPromocionDescuento(req, res) {

    var promocionId = req.params.id;
    var params = req.body;
    var cedis = params.cedis;
    var productoId = params.productoId;
    var descuento = params.descuento;

    console.log(promocionId);
    console.log(cedis);
    console.log(productoId);
    console.log(descuento);

    var myquery = { "_id": productoId, "items.cedis": cedis };
    var update = { $push: { "items.$.promociones": { "promocion_id": promocionId, "descuento": descuento } } };

    Producto.findOneAndUpdate(myquery, update, { new: true }, (err, productoActualizado) => {
        if (err) {
            res.status(500).send({ message: 'Error al guardar la promocion - descuento.' + err });
        } else {
            if (!productoActualizado) {
                res.status(404).send({ message: 'El producto no ha sido actualizado.' });
            } else {

                // Insertar Precio Final

                Producto.findById(productoId, (err, producto) => {
                    if (err) {
                        res.status(500).send({ message: 'Error en la petición' });
                    } else {
                        if (!producto) {
                            res.status(404).send({ message: 'El producto no existe.' });
                        } else {

                            var totalCedis = producto.items.length;
                            var descuentoTotal = 0;

                            switch (cedis) {
                                case 'Lindavista':

                                    var descuentosLindavista;

                                    for (let index = 0; index < totalCedis; index++) {
                                        if (producto.items[index].cedis == cedis) {
                                            descuentosLindavista = producto.items[index];
                                        }
                                    }

                                    var totalDescuentosLindavista = descuentosLindavista.promociones.length;

                                    for (let index = 0; index < totalDescuentosLindavista; index++) {
                                        if (descuentosLindavista.promociones[index].promocion_id.estatus == 1) {
                                            descuentoTotal += descuentosLindavista.promociones[index].descuento;
                                        }
                                    }

                                    var descuentoFinal = (producto.precio_lista * descuentoTotal) / 100;
                                    var precioFinal = producto.precio_lista - descuentoFinal;

                                    var myquery = { "_id": productoId, "items.cedis": cedis };

                                    var update = { $set: { "items.$.precio_final": precioFinal } };

                                    Producto.findOneAndUpdate(myquery, update, (err, productoActualizado) => {
                                        if (err) {
                                            res.status(500).send({ message: 'Error al guardar la promocion - descuento.' });
                                        } else {
                                            if (!productoActualizado) {
                                                res.status(404).send({ message: 'El producto no ha sido actualizado.' });
                                            } else {
                                                res.status(200).send({ producto: productoActualizado });
                                            }
                                        }
                                    });

                                    break;
                                case 'Casco de Santo Tomás':

                                    var descuentosCasco;

                                    for (let index = 0; index < totalCedis; index++) {
                                        if (producto.items[index].cedis == cedis) {
                                            descuentosCasco = producto.items[index];
                                        }
                                    }

                                    var totalDescuentosCasco = descuentosCasco.promociones.length;

                                    for (let index = 0; index < totalDescuentosCasco; index++) {
                                        if (descuentosCasco.promociones[index].promocion_id.estatus == 1) {
                                            descuentoTotal += descuentosCasco.promociones[index].descuento;
                                        }
                                    }

                                    var descuentoFinal = (producto.precio_lista * descuentoTotal) / 100;
                                    var precioFinal = producto.precio_lista - descuentoFinal;

                                    var myquery = { "_id": productoId, "items.cedis": cedis };

                                    var update = { $set: { "items.$.precio_final": precioFinal } };

                                    Producto.findOneAndUpdate(myquery, update, (err, productoActualizado) => {
                                        if (err) {
                                            res.status(500).send({ message: 'Error al guardar la promocion - descuento.' });
                                        } else {
                                            if (!productoActualizado) {
                                                res.status(404).send({ message: 'El producto no ha sido actualizado.' });
                                            } else {
                                                res.status(200).send({ producto: productoActualizado });
                                            }
                                        }
                                    });

                                    break;
                                case 'Ecatepec':

                                    var descuentosEcatepec;

                                    for (let index = 0; index < totalCedis; index++) {
                                        if (producto.items[index].cedis == cedis) {
                                            descuentosEcatepec = producto.items[index];
                                        }
                                    }

                                    var totalDescuentosEcatepec = descuentosEcatepec.promociones.length;

                                    for (let index = 0; index < totalDescuentosEcatepec; index++) {
                                        if (descuentosEcatepec.promociones[index].promocion_id.estatus == 1) {
                                            descuentoTotal += descuentosEcatepec.promociones[index].descuento;
                                        }
                                    }

                                    var descuentoFinal = (producto.precio_lista * descuentoTotal) / 100;
                                    var precioFinal = producto.precio_lista - descuentoFinal;

                                    var myquery = { "_id": productoId, "items.cedis": cedis };

                                    var update = { $set: { "items.$.precio_final": precioFinal } };

                                    Producto.findOneAndUpdate(myquery, update, (err, productoActualizado) => {
                                        if (err) {
                                            res.status(500).send({ message: 'Error al guardar la promocion - descuento.' });
                                        } else {
                                            if (!productoActualizado) {
                                                res.status(404).send({ message: 'El producto no ha sido actualizado.' });
                                            } else {
                                                res.status(200).send({ producto: productoActualizado });
                                            }
                                        }
                                    });

                                    break;
                                case 'Xala':

                                    var descuentosXala;

                                    for (let index = 0; index < totalCedis; index++) {
                                        if (producto.items[index].cedis == cedis) {
                                            descuentosXala = producto.items[index];
                                        }
                                    }

                                    var totalDescuentosXala = descuentosXala.promociones.length;

                                    for (let index = 0; index < totalDescuentosXala; index++) {
                                        if (descuentosXala.promociones[index].promocion_id.estatus == 1) {
                                            descuentoTotal += descuentosXala.promociones[index].descuento;
                                        }
                                    }

                                    var descuentoFinal = (producto.precio_lista * descuentoTotal) / 100;
                                    var precioFinal = producto.precio_lista - descuentoFinal;

                                    var myquery = { "_id": productoId, "items.cedis": cedis };

                                    var update = { $set: { "items.$.precio_final": precioFinal } };

                                    Producto.findOneAndUpdate(myquery, update, (err, productoActualizado) => {
                                        if (err) {
                                            res.status(500).send({ message: 'Error al guardar la promocion - descuento.' });
                                        } else {
                                            if (!productoActualizado) {
                                                res.status(404).send({ message: 'El producto no ha sido actualizado.' });
                                            } else {
                                                res.status(200).send({ producto: productoActualizado });
                                            }
                                        }
                                    });

                                    break;

                                default:
                                    break;
                            }

                            //res.status(200).send({ producto });
                        }
                    }
                }).populate('items.promociones.promocion_id');

                //res.status(200).send({ descuento_promocion: update, producto: productoActualizado });

            }
        }
    }).populate('items.cedis.promocion_id');

}

///////////////////////////////////////////////
// Editar Promoción - Descuento
///////////////////////////////////////////////

function editarPromocionDescuento(req, res) {

    var promocionId = req.params.id;
    var params = req.body;
    var productoId = params.productoId;
    var cedis = params.cedis;
    var descuento = params.descuento;

    console.log(req.body);

    var myquery = { "_id": productoId, "items": { $elemMatch: { "cedis": cedis, "promociones.promocion_id": promocionId } } };
    var update = { $pull: { "items.$.promociones": { "promocion_id": promocionId } } };

    Producto.findOneAndUpdate(myquery, update, { new: true }, (err, productoActualizado) => {
        if (err) {
            res.status(500).send({ message: 'Error al guardar la promocion - descuento.' + err });
        } else {
            if (!productoActualizado) {
                res.status(404).send({ message: 'El producto no ha sido actualizado.' });
            } else {

                var myquery2 = { "_id": productoId, "items.cedis": cedis };
                var update2 = { $push: { "items.$.promociones": { "promocion_id": promocionId, "descuento": descuento } } };

                Producto.findOneAndUpdate(myquery2, update2, { new: true }, (err, productoActualizado) => {
                    if (err) {
                        res.status(500).send({ message: 'Error al guardar la promocion - descuento.' + err });
                    } else {
                        if (!productoActualizado) {
                            res.status(404).send({ message: 'El producto no ha sido actualizado.' });
                        } else {

                            // Insertar Precio Final

                            Producto.findById(productoId, (err, producto) => {
                                if (err) {
                                    res.status(500).send({ message: 'Error en la petición' });
                                } else {
                                    if (!producto) {
                                        res.status(404).send({ message: 'El producto no existe.' });
                                    } else {

                                        var totalCedis = producto.items.length;
                                        var descuentoTotal = 0;

                                        switch (cedis) {
                                            case 'Lindavista':

                                                var descuentosLindavista;

                                                for (let index = 0; index < totalCedis; index++) {
                                                    if (producto.items[index].cedis == cedis) {
                                                        descuentosLindavista = producto.items[index];
                                                    }
                                                }

                                                var totalDescuentosLindavista = descuentosLindavista.promociones.length;

                                                if (totalDescuentosLindavista > 0) {

                                                    for (let index = 0; index < totalDescuentosLindavista; index++) {
                                                        if (descuentosLindavista.promociones[index].promocion_id.estatus == 1) {
                                                            descuentoTotal += descuentosLindavista.promociones[index].descuento;
                                                        }
                                                    }

                                                    var descuentoFinal = (producto.precio_lista * descuentoTotal) / 100;
                                                    var precioFinal = producto.precio_lista - descuentoFinal;

                                                    var myquery = { "_id": productoId, "items.cedis": cedis };

                                                    var update = { $set: { "items.$.precio_final": precioFinal } };

                                                    Producto.findOneAndUpdate(myquery, update, { new: true }, (err, productoActualizado) => {
                                                        if (err) {
                                                            res.status(500).send({ message: 'Error al guardar la promocion - descuento.' });
                                                        } else {
                                                            if (!productoActualizado) {
                                                                res.status(404).send({ message: 'El producto no ha sido actualizado.' });
                                                            } else {
                                                                res.status(200).send({ producto: productoActualizado });
                                                            }
                                                        }
                                                    });

                                                } else {

                                                    var myquery = { "_id": productoId, "items.cedis": cedis };

                                                    var update = { $unset: { "items.$.precio_final": "", "items.$.promociones": "" } };

                                                    Producto.findOneAndUpdate(myquery, update, { new: true }, (err, productoActualizado) => {
                                                        if (err) {
                                                            res.status(500).send({ message: 'Error al guardar la promocion - descuento.' });
                                                        } else {
                                                            if (!productoActualizado) {
                                                                res.status(404).send({ message: 'El producto no ha sido actualizado.' });
                                                            } else {
                                                                res.status(200).send({ producto: productoActualizado });
                                                            }
                                                        }
                                                    });

                                                }

                                                break;
                                            case 'Casco de Santo Tomás':

                                                var descuentosCasco;

                                                for (let index = 0; index < totalCedis; index++) {
                                                    if (producto.items[index].cedis == cedis) {
                                                        descuentosCasco = producto.items[index];
                                                    }
                                                }

                                                var totalDescuentosCasco = descuentosCasco.promociones.length;

                                                if (totalDescuentosCasco > 0) {

                                                    for (let index = 0; index < totalDescuentosCasco; index++) {
                                                        if (descuentosCasco.promociones[index].promocion_id.estatus == 1) {
                                                            descuentoTotal += descuentosCasco.promociones[index].descuento;
                                                        }
                                                    }

                                                    var descuentoFinal = (producto.precio_lista * descuentoTotal) / 100;
                                                    var precioFinal = producto.precio_lista - descuentoFinal;

                                                    var myquery = { "_id": productoId, "items.cedis": cedis };

                                                    var update = { $set: { "items.$.precio_final": precioFinal } };

                                                    Producto.findOneAndUpdate(myquery, update, { new: true }, (err, productoActualizado) => {
                                                        if (err) {
                                                            res.status(500).send({ message: 'Error al guardar la promocion - descuento.' });
                                                        } else {
                                                            if (!productoActualizado) {
                                                                res.status(404).send({ message: 'El producto no ha sido actualizado.' });
                                                            } else {
                                                                res.status(200).send({ producto: productoActualizado });
                                                            }
                                                        }
                                                    });

                                                } else {

                                                    var myquery = { "_id": productoId, "items.cedis": cedis };

                                                    var update = { $unset: { "items.$.precio_final": "", "items.$.promociones": "" } };

                                                    Producto.findOneAndUpdate(myquery, update, { new: true }, (err, productoActualizado) => {
                                                        if (err) {
                                                            res.status(500).send({ message: 'Error al guardar la promocion - descuento.' });
                                                        } else {
                                                            if (!productoActualizado) {
                                                                res.status(404).send({ message: 'El producto no ha sido actualizado.' });
                                                            } else {
                                                                res.status(200).send({ producto: productoActualizado });
                                                            }
                                                        }
                                                    });

                                                }

                                                break;
                                            case 'Ecatepec':

                                                var descuentosEcatepec;

                                                for (let index = 0; index < totalCedis; index++) {
                                                    if (producto.items[index].cedis == cedis) {
                                                        descuentosEcatepec = producto.items[index];
                                                    }
                                                }

                                                var totalDescuentosEcatepec = descuentosEcatepec.promociones.length;

                                                if (totalDescuentosEcatepec > 0) {

                                                    for (let index = 0; index < totalDescuentosEcatepec; index++) {
                                                        if (descuentosEcatepec.promociones[index].promocion_id.estatus == 1) {
                                                            descuentoTotal += descuentosEcatepec.promociones[index].descuento;
                                                        }
                                                    }

                                                    var descuentoFinal = (producto.precio_lista * descuentoTotal) / 100;
                                                    var precioFinal = producto.precio_lista - descuentoFinal;

                                                    var myquery = { "_id": productoId, "items.cedis": cedis };

                                                    var update = { $set: { "items.$.precio_final": precioFinal } };

                                                    Producto.findOneAndUpdate(myquery, update, { new: true }, (err, productoActualizado) => {
                                                        if (err) {
                                                            res.status(500).send({ message: 'Error al guardar la promocion - descuento.' });
                                                        } else {
                                                            if (!productoActualizado) {
                                                                res.status(404).send({ message: 'El producto no ha sido actualizado.' });
                                                            } else {
                                                                res.status(200).send({ producto: productoActualizado });
                                                            }
                                                        }
                                                    });

                                                } else {

                                                    var myquery = { "_id": productoId, "items.cedis": cedis };

                                                    var update = { $unset: { "items.$.precio_final": "", "items.$.promociones": "" } };

                                                    Producto.findOneAndUpdate(myquery, update, { new: true }, (err, productoActualizado) => {
                                                        if (err) {
                                                            res.status(500).send({ message: 'Error al guardar la promocion - descuento.' });
                                                        } else {
                                                            if (!productoActualizado) {
                                                                res.status(404).send({ message: 'El producto no ha sido actualizado.' });
                                                            } else {
                                                                res.status(200).send({ producto: productoActualizado });
                                                            }
                                                        }
                                                    });

                                                }

                                                break;
                                            case 'Xala':

                                                var descuentosXala;

                                                for (let index = 0; index < totalCedis; index++) {
                                                    if (producto.items[index].cedis == cedis) {
                                                        descuentosXala = producto.items[index];
                                                    }
                                                }

                                                var totalDescuentosXala = descuentosXala.promociones.length;

                                                if (totalDescuentosXala > 0) {

                                                    for (let index = 0; index < totalDescuentosXala; index++) {
                                                        if (descuentosXala.promociones[index].promocion_id.estatus == 1) {
                                                            descuentoTotal += descuentosXala.promociones[index].descuento;
                                                        }
                                                    }

                                                    var descuentoFinal = (producto.precio_lista * descuentoTotal) / 100;
                                                    var precioFinal = producto.precio_lista - descuentoFinal;

                                                    var myquery = { "_id": productoId, "items.cedis": cedis };

                                                    var update = { $set: { "items.$.precio_final": precioFinal } };

                                                    Producto.findOneAndUpdate(myquery, update, { new: true }, (err, productoActualizado) => {
                                                        if (err) {
                                                            res.status(500).send({ message: 'Error al guardar la promocion - descuento.' });
                                                        } else {
                                                            if (!productoActualizado) {
                                                                res.status(404).send({ message: 'El producto no ha sido actualizado.' });
                                                            } else {
                                                                res.status(200).send({ producto: productoActualizado });
                                                            }
                                                        }
                                                    });

                                                } else {

                                                    var myquery = { "_id": productoId, "items.cedis": cedis };

                                                    var update = { $unset: { "items.$.precio_final": "", "items.$.promociones": "" } };

                                                    Producto.findOneAndUpdate(myquery, update, { new: true }, (err, productoActualizado) => {
                                                        if (err) {
                                                            res.status(500).send({ message: 'Error al guardar la promocion - descuento.' });
                                                        } else {
                                                            if (!productoActualizado) {
                                                                res.status(404).send({ message: 'El producto no ha sido actualizado.' });
                                                            } else {
                                                                res.status(200).send({ producto: productoActualizado });
                                                            }
                                                        }
                                                    });

                                                }

                                                break;

                                            default:
                                                break;
                                        }

                                        //res.status(200).send({ producto });
                                    }
                                }
                            }).populate('items.promociones.promocion_id');

                        }
                    }
                }).populate('items.cedis.promocion_id');

                //res.status(200).send({ descuento_promocion: update, producto: productoActualizado });

            }
        }
    }).populate('items.cedis.promocion_id');

}

///////////////////////////////////////////////
// Eliminar Promoción - Descuento
///////////////////////////////////////////////

function eliminarPromocionDescuento(req, res) {

    var promocionId = req.params.id;
    var params = req.body;
    var productoId = params.productoId;
    var cedis = params.cedis;

    console.log(req.body);

    var myquery = { "_id": productoId, "items": { $elemMatch: { "cedis": cedis, "promociones.promocion_id": promocionId } } };
    var update = { $pull: { "items.$.promociones": { "promocion_id": promocionId } } };

    Producto.findOneAndUpdate(myquery, update, { new: true }, (err, productoActualizado) => {
        if (err) {
            res.status(500).send({ message: 'Error al guardar la promocion - descuento.' + err });
        } else {
            if (!productoActualizado) {
                res.status(404).send({ message: 'El producto no ha sido actualizado.' });
            } else {

                // Insertar Precio Final

                Producto.findById(productoId, (err, producto) => {
                    if (err) {
                        res.status(500).send({ message: 'Error en la petición' });
                    } else {
                        if (!producto) {
                            res.status(404).send({ message: 'El producto no existe.' });
                        } else {

                            var totalCedis = producto.items.length;
                            var descuentoTotal = 0;

                            switch (cedis) {
                                case 'Lindavista':

                                    var descuentosLindavista;

                                    for (let index = 0; index < totalCedis; index++) {
                                        if (producto.items[index].cedis == cedis) {
                                            descuentosLindavista = producto.items[index];
                                        }
                                    }

                                    var totalDescuentosLindavista = descuentosLindavista.promociones.length;

                                    if (totalDescuentosLindavista > 0) {

                                        for (let index = 0; index < totalDescuentosLindavista; index++) {
                                            if (descuentosLindavista.promociones[index].promocion_id.estatus == 1) {
                                                descuentoTotal += descuentosLindavista.promociones[index].descuento;
                                            }
                                        }

                                        var descuentoFinal = (producto.precio_lista * descuentoTotal) / 100;
                                        var precioFinal = producto.precio_lista - descuentoFinal;

                                        var myquery = { "_id": productoId, "items.cedis": cedis };

                                        var update = { $set: { "items.$.precio_final": precioFinal } };

                                        Producto.findOneAndUpdate(myquery, update, { new: true }, (err, productoActualizado) => {
                                            if (err) {
                                                res.status(500).send({ message: 'Error al guardar la promocion - descuento.' });
                                            } else {
                                                if (!productoActualizado) {
                                                    res.status(404).send({ message: 'El producto no ha sido actualizado.' });
                                                } else {
                                                    res.status(200).send({ producto: productoActualizado });
                                                }
                                            }
                                        });

                                    } else {

                                        var myquery = { "_id": productoId, "items.cedis": cedis };

                                        var update = { $unset: { "items.$.precio_final": "", "items.$.promociones": "" } };

                                        Producto.findOneAndUpdate(myquery, update, { new: true }, (err, productoActualizado) => {
                                            if (err) {
                                                res.status(500).send({ message: 'Error al guardar la promocion - descuento.' });
                                            } else {
                                                if (!productoActualizado) {
                                                    res.status(404).send({ message: 'El producto no ha sido actualizado.' });
                                                } else {
                                                    res.status(200).send({ producto: productoActualizado });
                                                }
                                            }
                                        });

                                    }

                                    break;
                                case 'Casco de Santo Tomás':

                                    var descuentosCasco;

                                    for (let index = 0; index < totalCedis; index++) {
                                        if (producto.items[index].cedis == cedis) {
                                            descuentosCasco = producto.items[index];
                                        }
                                    }

                                    var totalDescuentosCasco = descuentosCasco.promociones.length;

                                    if (totalDescuentosCasco > 0) {

                                        for (let index = 0; index < totalDescuentosCasco; index++) {
                                            if (descuentosCasco.promociones[index].promocion_id.estatus == 1) {
                                                descuentoTotal += descuentosCasco.promociones[index].descuento;
                                            }
                                        }

                                        var descuentoFinal = (producto.precio_lista * descuentoTotal) / 100;
                                        var precioFinal = producto.precio_lista - descuentoFinal;

                                        var myquery = { "_id": productoId, "items.cedis": cedis };

                                        var update = { $set: { "items.$.precio_final": precioFinal } };

                                        Producto.findOneAndUpdate(myquery, update, { new: true }, (err, productoActualizado) => {
                                            if (err) {
                                                res.status(500).send({ message: 'Error al guardar la promocion - descuento.' });
                                            } else {
                                                if (!productoActualizado) {
                                                    res.status(404).send({ message: 'El producto no ha sido actualizado.' });
                                                } else {
                                                    res.status(200).send({ producto: productoActualizado });
                                                }
                                            }
                                        });

                                    } else {

                                        var myquery = { "_id": productoId, "items.cedis": cedis };

                                        var update = { $unset: { "items.$.precio_final": "", "items.$.promociones": "" } };

                                        Producto.findOneAndUpdate(myquery, update, { new: true }, (err, productoActualizado) => {
                                            if (err) {
                                                res.status(500).send({ message: 'Error al guardar la promocion - descuento.' });
                                            } else {
                                                if (!productoActualizado) {
                                                    res.status(404).send({ message: 'El producto no ha sido actualizado.' });
                                                } else {
                                                    res.status(200).send({ producto: productoActualizado });
                                                }
                                            }
                                        });

                                    }

                                    break;
                                case 'Ecatepec':

                                    var descuentosEcatepec;

                                    for (let index = 0; index < totalCedis; index++) {
                                        if (producto.items[index].cedis == cedis) {
                                            descuentosEcatepec = producto.items[index];
                                        }
                                    }

                                    var totalDescuentosEcatepec = descuentosEcatepec.promociones.length;

                                    if (totalDescuentosEcatepec > 0) {

                                        for (let index = 0; index < totalDescuentosEcatepec; index++) {
                                            if (descuentosEcatepec.promociones[index].promocion_id.estatus == 1) {
                                                descuentoTotal += descuentosEcatepec.promociones[index].descuento;
                                            }
                                        }

                                        var descuentoFinal = (producto.precio_lista * descuentoTotal) / 100;
                                        var precioFinal = producto.precio_lista - descuentoFinal;

                                        var myquery = { "_id": productoId, "items.cedis": cedis };

                                        var update = { $set: { "items.$.precio_final": precioFinal } };

                                        Producto.findOneAndUpdate(myquery, update, { new: true }, (err, productoActualizado) => {
                                            if (err) {
                                                res.status(500).send({ message: 'Error al guardar la promocion - descuento.' });
                                            } else {
                                                if (!productoActualizado) {
                                                    res.status(404).send({ message: 'El producto no ha sido actualizado.' });
                                                } else {
                                                    res.status(200).send({ producto: productoActualizado });
                                                }
                                            }
                                        });

                                    } else {

                                        var myquery = { "_id": productoId, "items.cedis": cedis };

                                        var update = { $unset: { "items.$.precio_final": "", "items.$.promociones": "" } };

                                        Producto.findOneAndUpdate(myquery, update, { new: true }, (err, productoActualizado) => {
                                            if (err) {
                                                res.status(500).send({ message: 'Error al guardar la promocion - descuento.' });
                                            } else {
                                                if (!productoActualizado) {
                                                    res.status(404).send({ message: 'El producto no ha sido actualizado.' });
                                                } else {
                                                    res.status(200).send({ producto: productoActualizado });
                                                }
                                            }
                                        });

                                    }

                                    break;
                                case 'Xala':

                                    var descuentosXala;

                                    for (let index = 0; index < totalCedis; index++) {
                                        if (producto.items[index].cedis == cedis) {
                                            descuentosXala = producto.items[index];
                                        }
                                    }

                                    var totalDescuentosXala = descuentosXala.promociones.length;

                                    if (totalDescuentosXala > 0) {

                                        for (let index = 0; index < totalDescuentosXala; index++) {
                                            if (descuentosXala.promociones[index].promocion_id.estatus == 1) {
                                                descuentoTotal += descuentosXala.promociones[index].descuento;
                                            }
                                        }

                                        var descuentoFinal = (producto.precio_lista * descuentoTotal) / 100;
                                        var precioFinal = producto.precio_lista - descuentoFinal;

                                        var myquery = { "_id": productoId, "items.cedis": cedis };

                                        var update = { $set: { "items.$.precio_final": precioFinal } };

                                        Producto.findOneAndUpdate(myquery, update, { new: true }, (err, productoActualizado) => {
                                            if (err) {
                                                res.status(500).send({ message: 'Error al guardar la promocion - descuento.' });
                                            } else {
                                                if (!productoActualizado) {
                                                    res.status(404).send({ message: 'El producto no ha sido actualizado.' });
                                                } else {
                                                    res.status(200).send({ producto: productoActualizado });
                                                }
                                            }
                                        });

                                    } else {

                                        var myquery = { "_id": productoId, "items.cedis": cedis };

                                        var update = { $unset: { "items.$.precio_final": "", "items.$.promociones": "" } };

                                        Producto.findOneAndUpdate(myquery, update, { new: true }, (err, productoActualizado) => {
                                            if (err) {
                                                res.status(500).send({ message: 'Error al guardar la promocion - descuento.' });
                                            } else {
                                                if (!productoActualizado) {
                                                    res.status(404).send({ message: 'El producto no ha sido actualizado.' });
                                                } else {
                                                    res.status(200).send({ producto: productoActualizado });
                                                }
                                            }
                                        });

                                    }

                                    break;

                                default:
                                    break;
                            }

                            //res.status(200).send({ producto });
                        }
                    }
                }).populate('items.promociones.promocion_id');

                //res.status(200).send({ descuento_promocion: update, producto: productoActualizado });

            }
        }
    }).populate('items.cedis.promocion_id');

}

//////////////////////////////////////////////
// Consultar Producto Descuento Promocion
///////////////////////////////////////////////

function buscarProductoDescuentoPromocion(req, res) {

    let termino = req.params.termino;
    let regex = new RegExp(termino, 'i');

    var query = { $or: [{ cveproducto: regex }, { descripcion_corta: regex }, { dscproducto: regex }] };

    Producto.find(query, (err, producto) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (producto.length === 0) {
                res.status(404).send({ message: 'No hay producto.' });
            } else {

                res.status(200).send({ producto: producto });

            }
        }
    }).limit(1);
}

//////////////////////////////////////////////
// Consultar Productos por Promoción
///////////////////////////////////////////////


var mongoose = require('mongoose');

function obtenerProductosPromocion(req, res) {

    var promocionId = req.params.id;

    var myquery = [{ $match: { "items.promociones.promocion_id": mongoose.Types.ObjectId(promocionId) } }, { $unwind: "$items" }, { $unwind: "$items.promociones" }];

    Producto.aggregate(myquery, (err, productos) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' + err });
        } else {
            if (!productos) {
                res.status(404).send({ message: 'Los productos no existen.' });
            } else {

                var result = [];

                for (let index = 0; index < productos.length; index++) {

                    if (productos[index].items.promociones.promocion_id == promocionId) {
                        result.push(productos[index]);
                    }

                }

                res.status(200).send({ productos: result });

            }
        }

    });

}

//////////////////////////////////////////////
// Actualizar Precio Final por Promoción - Estatus - Inactivo
///////////////////////////////////////////////

var mongoose = require('mongoose');

function actualizarPrecioFinalEstatusInactivoPromocion(req, res) {

    var promocionId = req.params.id;

    var myquery = [{ $match: { "items.promociones.promocion_id": mongoose.Types.ObjectId(promocionId) } }, { $unwind: "$items" }, { $unwind: "$items.promociones" }];

    Producto.aggregate(myquery, (err, productos) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' + err });
        } else {
            if (!productos) {
                res.status(404).send({ message: 'Los productos no existen.' });
            } else {

                var result = [];

                for (let index = 0; index < productos.length; index++) {

                    if (productos[index].items.promociones.promocion_id == promocionId) {
                        result.push(productos[index]);
                    }

                }

                for (let index = 0; index < result.length; index++) {

                    var myquery2 = { "_id": result[index]._id, "items.cedis": result[index].items.cedis };

                    var precioFinal = result[index].items.precio_final + ((result[index].items.promociones.descuento * result[index].precio_lista) / 100);

                    var update = { $set: { "items.$.precio_final": precioFinal } };

                    Producto.findOneAndUpdate(myquery2, update, (err, productoActualizado) => {
                        if (err) {
                            res.status(500).send({ message: 'Error al guardar la promocion - descuento.' });
                        } else {
                            if (!productoActualizado) {
                                res.status(404).send({ message: 'El producto no ha sido actualizado.' });
                            } else {
                                //res.status(200).send({ producto: productoActualizado });
                            }
                        }
                    });

                }

                res.status(200).send({ productos: result });

            }
        }

    });

}

//////////////////////////////////////////////
// Actualizar Precio Final por Promoción - Estatus - Activo
///////////////////////////////////////////////

var mongoose = require('mongoose');

function actualizarPrecioFinalEstatusActivoPromocion(req, res) {

    var promocionId = req.params.id;

    var myquery = [{ $match: { "items.promociones.promocion_id": mongoose.Types.ObjectId(promocionId) } }, { $unwind: "$items" }, { $unwind: "$items.promociones" }];

    Producto.aggregate(myquery, (err, productos) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' + err });
        } else {
            if (!productos) {
                res.status(404).send({ message: 'Los productos no existen.' });
            } else {

                var result = [];

                for (let index = 0; index < productos.length; index++) {

                    if (productos[index].items.promociones.promocion_id == promocionId) {
                        result.push(productos[index]);
                    }

                }

                for (let index = 0; index < result.length; index++) {

                    var myquery2 = { "_id": result[index]._id, "items.cedis": result[index].items.cedis };

                    var precioFinal = result[index].items.precio_final - ((result[index].items.promociones.descuento * result[index].precio_lista) / 100);

                    var update = { $set: { "items.$.precio_final": precioFinal } };

                    Producto.findOneAndUpdate(myquery2, update, (err, productoActualizado) => {
                        if (err) {
                            res.status(500).send({ message: 'Error al guardar la promocion - descuento.' });
                        } else {
                            if (!productoActualizado) {
                                res.status(404).send({ message: 'El producto no ha sido actualizado.' });
                            } else {
                                //res.status(200).send({ producto: productoActualizado });
                            }
                        }
                    });

                }

                res.status(200).send({ productos: result });

            }
        }

    });

}

//////////////////////////////////////////////
// Consultar Productos por Categoría
///////////////////////////////////////////////

function obtenerProductosCategoria(req, res) {

    var categoriaId = req.params.id;
    var cedis = req.params.cedis;
    //var skip = req.params.skip;

    var myquery = [{ $unwind: "$items" }, { $match: { "categoria": mongoose.Types.ObjectId(categoriaId), "items.cedis": cedis } }];

    Producto.aggregate(myquery, (err, productos) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!productos) {
                res.status(404).send({ message: 'Los productos no existen.' });
            } else {

                let totalItems = productos.length;
                let totalPages;

                if (totalItems <= 12) {
                    totalPages = 1;
                } else {

                    totalPages = totalItems / 12;

                    if (totalPages % 1 == 0) {

                    } else {
                        totalPages = parseInt(totalPages + 1);
                    }
                }

                res.status(200).send({ totalItems, totalPages, productos });

            }
        }
    });

}

function obtenerProductoCedis(req, res) {

    var productoId = req.params.id;
    var cedis = req.params.cedis;

    var myquery = [{ $unwind: "$items" }, { $match: { "_id": mongoose.Types.ObjectId(productoId), "items.cedis": cedis } }];

    Producto.aggregate(myquery, (err, producto) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!producto) {
                res.status(404).send({ message: 'El producto no existe.' });
            } else {

                res.status(200).send({ producto });

            }
        }
    });

}

module.exports = {
    insertarProducto,
    obtenerProducto,
    buscarProductosPaginado,
    actualizarProducto,
    eliminarProducto,
    subirImagenProducto0,
    subirImagenProducto1,
    subirImagenProducto2,
    subirImagenProducto3,
    eliminarImg1,
    eliminarImg2,
    eliminarImg3,
    eliminarImg4,
    obtenerImagenProducto,
    subirPdfProducto,
    insertarPromocionDescuento,
    editarPromocionDescuento,
    eliminarPromocionDescuento,
    buscarProductoDescuentoPromocion,
    obtenerProductosPromocion,
    actualizarPrecioFinalEstatusInactivoPromocion,
    actualizarPrecioFinalEstatusActivoPromocion,
    obtenerProductosCategoria,
    obtenerProductoCedis
};