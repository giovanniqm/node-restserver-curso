// # - Archivo Encargado De Trabajar El Modelo De Datos

// =================================
//    Librerías y Carga de Archivos
// ==================================

// Librería Mongoose
const mongoose = require('mongoose');

// Librería para validar parametros Únicos
const uniqueValidator = require('mongoose-unique-validator');

// ============================
// # - Definimos el Eschema
// ============================

// Variable para definir roles, y los mensajes de error
let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido'
};

// Obtenemos el esquemas o cascaron para crear esquemas de mongoose
let Schema = mongoose.Schema;
// const Schema = mongoose.Schema;

// ================
//      Eschema
// ================

let usuarioSchema = new Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },

    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },

    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },


    img: {
        type: String,
        required: [false, 'La imagen no es obligatoria']
    },

    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },

    estado: {
        type: Boolean,
        default: true
    },

    google: {
        type: Boolean,
        default: false
    }
});

// =========================
// Modificación del SCHEMA
// =========================
// # - Esta es una forma de modificar el objeto JSON del SCHEMA, para no mostrar el campo PASSWORD

usuarioSchema.methods.toJSON = function() {

    let user = this;
    let userObject = user.toObject(); // De esta manera obtenemos todas las propiedades y metodos
    delete userObject.password;

    return userObject;
}

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });

module.exports = mongoose.model('Usuario', usuarioSchema);