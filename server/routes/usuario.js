// Archivo que contiene las peticiones y los procesos

// =================================
//    Librerías y Carga de Archivos
// ==================================

// # - Para cargar el Schema
const Usuario = require('../models/usuario');

// # - Libreria Express => Propiedades (app.get, app.post... etc)
const express = require('express');
const app = express();

// # - Libreria Bcrypt => Para encriptar contraseñas
// https://www.npmjs.com/package/bcrypt
const bcrypt = require('bcrypt');

// # - Libreria Underscore => Contiene el metodo pick
// https://underscorejs.org/
const _ = require('underscore');

// ====================================== //
//  # - GET => Para OBTENER los registros
// ====================================== //

app.get('/usuario', function(req, res) {

    // Desde que registro quiero
    let desde = req.query.desde || 0;
    desde = Number(desde);

    // Cuantos quiero por pagina
    let limite = req.query.limite || 5;
    limite = Number(limite);

    // Traer todos los registros de una coleccion Mongo
    Usuario.find({ estado: true }, 'nombre email role estado google img') // Segundo parametro para filtrar
        .skip(desde) // Salta de (5) en (5)
        .limit(limite) // Muestrame solo (5) registros
        .exec((err, usuarios) => { // Ejecutame el query

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err: err
                });
            }

            // Para saber cuantos registros tenemos
            Usuario.count({ estado: true }, (err, conteo) => {

                res.json({
                    ok: true,
                    usuarios: usuarios,
                    cuantos: conteo
                });

            })

        })
});

// ========================================
// # - POST => Para CREAR nuevos registros
// ========================================

app.post('/usuario', function(req, res) {

    let body = req.body;

    // Esto es una instancia del usuario Schema, con todas las propiedades y metodos de mongoose
    let usuario = new Usuario({

        // Esto es un nuevo OBJETO
        nombre: body.nombre,
        email: body.email,

        // El primer parametro es el campo que necesito encriptar, y el segundo parametro, las vuelta que quiero que de el algoritmo encriptador
        password: bcrypt.hashSync(body.password, 10),

        role: body.role

    });

    // Asi grabamos en la base de datos
    usuario.save((err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err: err
            });
        }

        // # - Ocultar el campo PASSWORD a fuerza, en las respuestas del usuario
        //usuarioDB.password = null;

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });

});

// ====================================== //
// # - PUT => Para ACTUALIZAR registros
// ====================================== //

app.put('/usuario/:id', function(req, res) {

    let id = req.params.id; // Obtenemos el ID

    // El metodo pick nos permite definir que elementos del objeto body, queremos que se puedan actualizar
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    // # - Con la funcion: findByIdAndUpdate necesitamos:
    // ID - Body, Opcion y un Call Back; (Dentro del objeto tenemos otros parametros. runValidators: true => Muestra el campo actualizado)

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err: err
            });
        }

        res.json({ // Retorna lo que sea que se envie por URL
            ok: true,
            usuario: usuarioDB
        });
    })

});

// ====================================== //
// # - DELETE => Para ELIMINAR registros
// ====================================== //

app.delete('/usuario/:id', function(req, res) {

    let id = req.params.id; // Obtenemos el ID

    // # - ELIMINAR fisicamente un registro    
    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

    let cambiaEstado = {
        estado: false
    };

    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err: err
            });
        };

        // Si intentamos borrar un ID ya eliminado
        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        });

    });

});

// Para exportar este modulo
module.exports = app;