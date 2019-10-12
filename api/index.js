'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3000;

mongoose.connect('mongodb://201.107.4.129:27017/siscom', { useNewUrlParser: true, useCreateIndex: true }, (err, res) => {
    if (err) {
        throw err;
    } else {
        console.log("La conexión a la base de datos está funcionando correctamente");

        var pg = require('pg');
        var pool = new pg.Pool();
        var MongoClient = require('mongodb').MongoClient; //instalar la version   npm install mongo@2.2.33
        var url = "mongodb://localhost:27017/siscom";
        const { Client } = require('pg');

        // Connect to Postgres (replace with your own connection string)
        const connectionData = {
            user: 'siscom',
            host: '201.107.4.129',
            database: 'productos_siscom',
            password: 'Siscom45*123',
            port: 5432,
        }

        /*const client = new Client(connectionData);

        client.connect(function(err, client) {
            if (err) {
                console.log(err);
            }
            client.on('notification', function(msg) {
                console.log(msg);
                var resultado = JSON.parse(msg.payload);
                // console.log(resultado.Clave_Producto);

                MongoClient.connect(url, function(err, db) {
                    if (err) throw err;
                    // var myStudent = {resultado };
                    var ClaveProducto = { Clave_Producto: resultado.Clave_Producto };
                    var cveproducto = resultado.Clave_Producto;
                    var cedis = resultado.cedis;
                    var existencias = resultado.existencias;
                    var precio = resultado.precio;
                    //var newvalues = { resultado  };
                    console.log(ClaveProducto);
                    console.log(cveproducto);
                    console.log(cedis);
                    console.log(existencias);
                    console.log(precio);

                    db.collection('productos', function(err, collection) {

                        // Update the document with an atomic operator
                        collection.updateOne({ "cveproducto": "" + cveproducto + "", "items.cedis": "" + cedis + "" }, { $set: { "items.$.precio_final": precio, "items.$.existencias": existencias } });

                        // Wait for a second then fetch the document
                        setTimeout(function() {

                            // Fetch the document that we modified

                        }, 1000);

                    });





                    db.collection("Productos_Detalle").updateOne(ClaveProducto, resultado, function(err, result) {
                        if (err) throw err;
                        console.log("1 Recorded UPDATE");
                        //  console.log(result);
                        db.close();
                    });
                });
            });

            var query = client.query("LISTEN watchersa");
        });

        const client2 = new Client(connectionData)

        client2.connect(function(err, client2) {
            if (err) {
                console.log(err);
            }
            client2.on('notification', function(msg) {
                console.log(msg);
                var resultado = JSON.parse(msg.payload);
                console.log(resultado);

                MongoClient.connect(url, function(err, db) {
                    if (err) throw err;

                    db.collection("productos").insertOne(resultado, function(err, result) {
                        if (err) throw err;
                        console.log("1 Recorded Inserted");
                        db.close();
                    });


                });
            });

            var query = client2.query("LISTEN watchers");

        });*/

        app.listen(port, function() {
            console.log("Servidor Web funcionando en http://localhost:" + port);
        });
    }
});