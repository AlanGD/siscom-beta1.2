'use strict'

var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var jwt = require('../services/jwt');
const nodemailer = require('nodemailer');

function pruebas(req, res) {
    res.status(200).send({
        message: 'Probando una acción del controlador de usuarios del api rest'
    });
}

///////////////////////////////////////////////
// REGISTRO WEB
///////////////////////////////////////////////

function saveUser(req, res) {
    var user = new User();

    var params = req.body;

    console.log(params);

    user.nombre = params.nombre;
    user.apellidos = params.apellidos;
    user.correo = params.correo;
    user.fecha_nacimiento = params.fecha_nacimiento;
    user.telefono = params.telefono;
    user.escuela = params.escuela;
    user.sucursal = params.sucursal;
    user.password = params.password;
    user.creado_en = new Date();
    user.actualizado_en = new Date();
    user.role = 'ROLE_CLIENT';
    user.futuro1 = 'null';
    user.futuro2 = 'null';

    var nombre = params.nombre;
    var apellidos = params.apellidos;
    var correo = params.correo;
    var fecha_nacimiento = params.fecha_nacimiento;
    var telefono = params.telefono;
    var sucursal = params.sucursal;
    var password = params.password;
    var confirm_password = params.confirm_password;

    function validar_email(correo) {
        var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(correo) ? true : false;
    }

    function validar_telefono(telefono) {
        var regex = /^(?=.\d)(?=.[1-9]).{10}$/;
        return regex.test(telefono) ? true : false;
    }

    function validar_password(password) {
        var regex = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
        return regex.test(password) ? true : false;
    }

    User.findOne({ correo: correo.toLowerCase() }, (err, user) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {

            if (nombre && apellidos && correo && fecha_nacimiento && telefono && sucursal && password && confirm_password) {

                if (validar_email(correo) == false) {
                    res.status(404).send({ message: 'Introduzca un E-Mail válido.' });
                } else if (user) {
                    res.status(404).send({ message: 'Este E-Mail ya está asociado a otra cuenta.' });
                } else if (validar_telefono(telefono) == false) {
                    res.status(404).send({ message: 'El número de teléfono debe contener 10 dígitos.' });
                } else if (validar_password(password) == false) {
                    res.status(404).send({ message: 'La clave debe tener entre 8-16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula. Puede tener otros símbolos.' });
                } else if (password != confirm_password) {
                    res.status(404).send({ message: 'Las claves no coinciden.' });
                } else {
                    // Guardar el usuario
                    save_user();
                }

            } else {
                res.status(404).send({ message: 'Ingrese todos sus datos para continuar.' });
            }

        }

    });

    function save_user() {

        // Encriptar contraseña
        bcrypt.hash(params.password, null, null, function(err, hash) {
            user.password = hash;

            // Guardar el usuario
            user.save((err, userStored) => {
                if (err) {
                    res.status(500).send({ message: 'Error al guardar el usuario' });
                } else {
                    if (!userStored) {
                        res.status(404).send({ message: 'No se ha registrado el usuario' });
                    } else {
                        res.status(200).send({ user: userStored });
                    }
                }
            });

        });

    }

}

///////////////////////////////////////////////
// REGISTRO APP
///////////////////////////////////////////////

function saveUserApp(req, res) {
    var user = new User();

    var params = req.body;

    console.log(params);

    user.nombre = params.nombre;
    user.apellidos = params.apellidos;
    user.correo = params.correo;
    user.fecha_nacimiento = params.fecha_nacimiento;
    user.telefono = params.telefono;
    user.escuela = params.escuela;
    user.sucursal = params.sucursal;
    user.password = params.password;
    user.creado_en = new Date();
    user.actualizado_en = new Date();
    user.role = 'ROLE_CLIENT';
    user.futuro1 = 'null';
    user.futuro2 = 'null';

    var nombre = params.nombre;
    var apellidos = params.apellidos;
    var correo = params.correo;
    var fecha_nacimiento = params.fecha_nacimiento;
    var telefono = params.telefono;
    var sucursal = params.sucursal;
    var password = params.password;
    var confirm_password = params.confirm_password;

    function validar_email(correo) {
        var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(correo) ? true : false;
    }

    function validar_telefono(telefono) {
        var regex = /^(?=.\d)(?=.[1-9]).{10}$/;
        return regex.test(telefono) ? true : false;
    }

    function validar_password(password) {
        var regex = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
        return regex.test(password) ? true : false;
    }

    User.findOne({ correo: correo.toLowerCase() }, (err, user) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {

            if (nombre && apellidos && correo && fecha_nacimiento && telefono && sucursal && password && confirm_password) {

                if (validar_email(correo) == false) {
                    //res.status(404).send({ message: 'Introduzca un E-Mail válido.' });
                    res.send('email-invalido');
                } else if (user) {
                    //res.status(404).send({ message: 'Este E-Mail ya está asociado a otra cuenta.' });
                    res.send('cuenta-existente');
                } else if (validar_telefono(telefono) == false) {
                    //res.status(404).send({ message: 'El número de teléfono debe contener 10 dígitos.' });
                    res.send('validacion-telefono');
                } else if (validar_password(password) == false) {
                    //res.status(404).send({ message: 'La clave debe tener entre 8-16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula. Puede tener otros símbolos.' });
                    res.send('validacion-password');
                } else if (password != confirm_password) {
                    //res.status(404).send({ message: 'Las claves no coinciden.' });
                    res.send('validacion-confirm-password');
                } else {
                    // Guardar el usuario
                    save_user();
                }

            } else {
                //res.status(404).send({ message: 'Ingrese todos sus datos para continuar.' });
                res.send('ingresar-datos');
            }

        }

    });

    function save_user() {

        // Encriptar contraseña
        bcrypt.hash(params.password, null, null, function(err, hash) {
            user.password = hash;

            // Guardar el usuario
            user.save((err, userStored) => {
                if (err) {
                    res.status(500).send({ message: 'Error al guardar el usuario' });
                } else {
                    if (!userStored) {
                        res.status(404).send({ message: 'No se ha registrado el usuario' });
                    } else {
                        res.status(200).send({ user: userStored });
                    }
                }
            });

        });

    }

}

///////////////////////////////////////////////
// LOGIN WEB
///////////////////////////////////////////////

function loginUser(req, res) {
    var params = req.body;

    var correo = params.correo;
    var password = params.password;

    function validar_email(correo) {
        var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(correo) ? true : false;
    }

    User.findOne({ correo: correo.toLowerCase() }, (err, user) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {

            if (correo.length <= 0 || password.length <= 0) {
                res.status(404).send({ message: 'Ingrese todos sus datos para continuar.' });
            } else if (validar_email(correo) == false) {
                res.status(404).send({ message: 'Introduzca un E-Mail válido.' });
            } else {

                if (!user) {
                    res.status(404).send({ message: 'E-Mail incorrecto, por favor verifiquelo.' });
                } else {

                    // Comprobar la contraseña
                    bcrypt.compare(password, user.password, function(err, check) {
                        if (check) {
                            // Devolver los datos del usuario logueado
                            if (params.gethash) {
                                // Devolver un token de jwt
                                res.status(200).send({
                                    token: jwt.createToken(user)
                                });
                            } else {
                                res.status(200).send({ user });
                            }
                        } else {
                            res.status(404).send({ message: 'Clave incorrecta, por favor verifiquela.' });
                        }
                    });
                }

            }
        }
    });
}

///////////////////////////////////////////////
// LOGIN WEB APP
///////////////////////////////////////////////

function loginUserApp(req, res) {
    var params = req.body;

    var correo = params.correo;
    var password = params.password;

    function validar_email(correo) {
        var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(correo) ? true : false;
    }

    User.findOne({ correo: correo.toLowerCase() }, (err, user) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {

            if (correo.length <= 0 || password.length <= 0) {
                //res.status(404).send({ message: 'Ingrese todos sus datos para continuar.' });
                res.send('ingresar-datos');
            } else if (validar_email(correo) == false) {
                //res.status(404).send({ message: 'Introduzca un E-Mail válido.' });
                res.send('mail-invalido');
            } else {

                if (!user) {
                    //res.status(404).send({ message: 'E-Mail incorrecto, por favor verifiquelo.' });
                    res.send('mail-verificar');
                } else {

                    // Comprobar la contraseña
                    bcrypt.compare(password, user.password, function(err, check) {
                        if (check) {
                            // Devolver los datos del usuario logueado
                            if (params.gethash) {
                                // Devolver un token de jwt
                                res.status(200).send({
                                    token: jwt.createToken(user)
                                });
                            } else {
                                res.status(200).send({ user });
                            }
                        } else {
                            //res.status(404).send({ message: 'Clave incorrecta, por favor verifiquela.' });
                            res.send('clave-verificar');
                        }
                    });
                }

            }
        }
    });
}

///////////////////////////////////////////////
// Recuperar Clave de Acceso
///////////////////////////////////////////////

function passwordRecovery(req, res) {

    var params = req.body;

    var correo = params.correo;

    function validar_email(correo) {
        var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(correo) ? true : false;
    }

    User.findOne({ correo: correo.toLowerCase() }, (err, user) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {

            if (correo) {

                if (validar_email(correo) == false) {
                    res.status(404).send({ message: 'Introduzca un E-Mail válido.' });
                } else if (!user) {
                    res.status(404).send({ message: 'Este E-Mail no pertenece a ninguna cuenta.' });
                } else {

                    var id = user._id;

                    // Mandar E-Mail al usuario
                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'siscomelectronicamx@gmail.com', // Cambialo por tu email
                            pass: '1245Qeadzc' // Cambialo por tu password
                        }
                    });

                    const mailOptions = {
                        //from: `”${formulario.nombre} 👻” <${formulario.email}>`,
                        from: 'SISCOM Electrónica',
                        to: '' + correo, // Cambia esta parte por el destinatario
                        //subject: formulario.asunto,
                        subject: 'Recuperar clave de acceso',
                        html: `
                        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
                        <html xmlns="http://www.w3.org/1999/xhtml" xmlns="http://www.w3.org/1999/xhtml">
                        
                        <head>
                            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                            <title>Set up a new password for [Product Name]</title>
                        </head>
                        
                        <body style="-webkit-text-size-adjust: none; box-sizing: border-box; color: #74787E; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; height: 100%; line-height: 1.4; margin: 0; width: 100% !important;" bgcolor="#F2F4F6">
                            <style type="text/css">
                                body {
                                    width: 100% !important;
                                    height: 100%;
                                    margin: 0;
                                    line-height: 1.4;
                                    background-color: #F2F4F6;
                                    color: #74787E;
                                    -webkit-text-size-adjust: none;
                                }
                                
                                @media only screen and (max-width: 600px) {
                                    .email-body_inner {
                                        width: 100% !important;
                                    }
                                    .email-footer {
                                        width: 100% !important;
                                    }
                                }
                                
                                @media only screen and (max-width: 500px) {
                                    .button {
                                        width: 100% !important;
                                    }
                                }
                            </style>
                            <span class="preheader" style="box-sizing: border-box; display: none !important; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 1px; line-height: 1px; max-height: 0; max-width: 0; mso-hide: all; opacity: 0; overflow: hidden; visibility: hidden;">Utilice este enlace para restablecer su clave de acceso. El enlace solo es válido por 24 horas.</span>
                            <table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0" style="box-sizing: border-box; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; margin: 0; padding: 0; width: 100%;" bgcolor="#F2F4F6">
                                <tr>
                                    <td align="center" style="box-sizing: border-box; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; word-break: break-word;">
                                        <table class="email-content" width="100%" cellpadding="0" cellspacing="0" style="box-sizing: border-box; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; margin: 0; padding: 0; width: 100%;">
                                            <tr>
                                                <td class="email-masthead" style="box-sizing: border-box; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; padding: 25px 0; word-break: break-word;" align="center">
                                                    <a href="https://example.com" class="email-masthead_name" style="box-sizing: border-box; color: #bbbfc3; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 16px; font-weight: bold; text-decoration: none; text-shadow: 0 1px 0 white;">
                                SISCOM Electrónica
                              </a>
                                                </td>
                                            </tr>
                        
                                            <tr>
                                                <td class="email-body" width="100%" cellpadding="0" cellspacing="0" style="-premailer-cellpadding: 0; -premailer-cellspacing: 0; border-bottom-color: #EDEFF2; border-bottom-style: solid; border-bottom-width: 1px; border-top-color: #EDEFF2; border-top-style: solid; border-top-width: 1px; box-sizing: border-box; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; margin: 0; padding: 0; width: 100%; word-break: break-word;"
                                                    bgcolor="#FFFFFF">
                                                    <table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0" style="box-sizing: border-box; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; margin: 0 auto; padding: 0; width: 570px;" bgcolor="#FFFFFF">
                        
                                                        <tr>
                                                            <td class="content-cell" style="box-sizing: border-box; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; padding: 35px; word-break: break-word;">
                                                                <h1 style="box-sizing: border-box; color: #2F3133; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 19px; font-weight: bold; margin-top: 0;" align="left">Hola,</h1>
                                                                <p style="box-sizing: border-box; color: #74787E; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 16px; line-height: 1.5em; margin-top: 0;" align="left">Recientemente solicitó restablecer su clave de acceso para su cuenta. Utilice el botón de abajo para restablecerlo. <strong style="box-sizing: border-box; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;">Este restablecimiento de la clave de acceso solo es válido durante las próximas 24 horas.</strong></p>
                        
                                                                <table class="body-action" align="center" width="100%" cellpadding="0" cellspacing="0" style="box-sizing: border-box; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; margin: 30px auto; padding: 0; text-align: center; width: 100%;">
                                                                    <tr>
                                                                        <td align="center" style="box-sizing: border-box; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; word-break: break-word;">
                        
                                                                            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="box-sizing: border-box; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;">
                                                                                <tr>
                                                                                    <td align="center" style="box-sizing: border-box; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; word-break: break-word;">
                                                                                        <table border="0" cellspacing="0" cellpadding="0" style="box-sizing: border-box; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;">
                                                                                            <tr>
                                                                                                <td style="box-sizing: border-box; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; word-break: break-word;">
                                                                                                    <a href="http://201.107.4.129:3001/password-reset/` + id + `" class="button button--green" target="_blank" style="-webkit-text-size-adjust: none; background: #22BC66; border-color: #22bc66; border-radius: 3px; border-style: solid; border-width: 10px 18px; box-shadow: 0 2px 3px rgba(0, 0, 0, 0.16); box-sizing: border-box; color: #FFF; display: inline-block; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; text-decoration: none;">Restablecer su clave</a>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <p style="box-sizing: border-box; color: #74787E; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 16px; line-height: 1.5em; margin-top: 0;" align="left">Por seguridad, si no solicitó un restablecimiento de clave de acceso, ignore este correo electrónico o póngase en contacto con el <a href="{{support_url}}" style="box-sizing: border-box; color: #3869D4; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;">servicio de asistencia</a>                                            si tiene alguna pregunta.</p>
                                                                <p style="box-sizing: border-box; color: #74787E; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 16px; line-height: 1.5em; margin-top: 0;" align="left">Gracias,
                                                                    <br />SISCOM Electrónica</p>
                        
                                                                <table class="body-sub" style="border-top-color: #EDEFF2; border-top-style: solid; border-top-width: 1px; box-sizing: border-box; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; margin-top: 25px; padding-top: 25px;">
                                                                    <tr>
                                                                        <td style="box-sizing: border-box; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; word-break: break-word;">
                                                                            <p class="sub" style="box-sizing: border-box; color: #74787E; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 12px; line-height: 1.5em; margin-top: 0;" align="left">Si tiene problemas con el botón de arriba, copie y pegue la URL a continuación en su navegador web.</p>
                                                                            <p class="sub" style="box-sizing: border-box; color: #74787E; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 12px; line-height: 1.5em; margin-top: 0;" align="left">http://201.107.4.129:3001/password-reset/` + id + `</p>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="box-sizing: border-box; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; word-break: break-word;">
                                                    <table class="email-footer" align="center" width="570" cellpadding="0" cellspacing="0" style="box-sizing: border-box; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; margin: 0 auto; padding: 0; text-align: center; width: 570px;">
                                                        <tr>
                                                            <td class="content-cell" align="center" style="box-sizing: border-box; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; padding: 35px; word-break: break-word;">
                                                                <p class="sub align-center" style="box-sizing: border-box; color: #AEAEAE; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 12px; line-height: 1.5em; margin-top: 0;" align="center">© 2019 SISCOM Electrónica. Todos los derechos reservados.</p>
                                                                <p class="sub align-center" style="box-sizing: border-box; color: #AEAEAE; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 12px; line-height: 1.5em; margin-top: 0;" align="center">
                                                                    www.siscomelectronica.com
                                                                    <br />Dirección: Av. Instituto Politécnico Nacional #2085, Col. San Pedro Zacatenco, Lindavista. Deleg. Gustavo A. Madero. CP 07360
                                                                    <br />Horario: Lunes a Viernes 8:00 - 20:00 hrs. y Sábado 11:00 - 16:00 hrs.
                                                                    <br />Telefonos: (55) 5752 7395
                                                                </p>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </body>
                        
                        </html>
                 `
                    };

                    transporter.sendMail(mailOptions, function(err, info) {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log(info);
                            res.status(200).send({ user });
                        }
                    });

                }

            } else {
                res.status(404).send({ message: 'Ingrese todos sus datos para continuar.' });
            }

        }

    });

}

function passwordReset(req, res) {

    var userId = req.params.id;
    var password = req.body.password;
    var confirm_password = req.body.confirm_password;
    var userNewPassword;

    function validar_password(password) {
        var regex = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
        return regex.test(password) ? true : false;
    }

    if (password && confirm_password) {

        if (validar_password(password) == false) {
            res.status(404).send({ message: 'La clave debe tener entre 8-16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula. Puede tener otros símbolos.' });
        } else if (password != confirm_password) {
            res.status(404).send({ message: 'Las claves no coinciden.' });
        } else {

            // Actualizar clave del usuario
            bcrypt.hash(req.body.password, null, null, function(err, hash) {
                userNewPassword = hash;

                User.findByIdAndUpdate(userId, { "password": userNewPassword }, (err, userUpdated) => {

                    if (err) {
                        res.status(500).send({ message: 'Error al actualizar el usuario.' });
                    } else {
                        if (!userUpdated) {
                            res.status(404).send({ message: 'No se ha podido actualizar el usuario.' });
                        } else {
                            res.status(200).send({ user: userUpdated });
                        }
                    }

                });

            });

        }

    } else {
        res.status(404).send({ message: 'Ingrese todos sus datos para continuar.' });
    }

}

module.exports = {
    pruebas,
    saveUser,
    saveUserApp,
    loginUser,
    loginUserApp,
    passwordRecovery,
    passwordReset
};