/*==================================================
# - Definimos un archivo para el manejo de puerto
# - Esto para definir a futuro los entornos
# - El de producción y el de desarrollo
# - Entendiendo que el de desarrollo es nuestro equipo
# - Y producción es la NUBE
===================================================*/

// =================
//      Puerto:
// =================
process.env.PORT = process.env.PORT || 3000;

// =======================
//         Entorno:
// =======================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// =======================
//     Base de Datos
// =======================
let urlDB;

if (process.env.NODE_ENV === 'dev') {

    urlDB = 'mongodb://localhost:27017/crud';
} else {

    urlDB = 'mongodb+srv://giovanniq:5587700gq@restserver-db3wk.mongodb.net/test?retryWrites=true&w=majority';

}

process.env.URLDB = urlDB;