// =================================
//    Librerías y Carga de Archivos
// ==================================

require('./config/config');

// # - Librería Express 
// https://www.npmjs.com/package/express 

const express = require('express');
const app = express();

// # - Librería Mongoose 
// https://www.npmjs.com/package/mongoose

const mongoose = require('mongoose');

// # - Librería BodyParser => PARA HACER PETICIONES GET - POST - PUT - DELETE
// https://www.npmjs.com/package/body-parser

const bodyParser = require('body-parser');

// ================
//    Middleware
// ================

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//
app.use(require('./routes/usuario'));

// ====================
//    Conexión con DB
// ====================

// mongoose.connect('mongodb://localhost:27017/crud', (err, res) => {   => Antes

mongoose.connect(process.env.URLDB, (err, res) => {

    if (err) throw err;

    console.log('Base de datos ONLINE');

});

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});