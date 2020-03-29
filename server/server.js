require('./config/config');

const express = require('express')
const app = express()
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())




// GET => Para OBTENER los registros
app.get('/usuario', function(req, res) {
    res.json('get Usuario');
});




// POST => Para CREAR nuevos registros
app.post('/usuario', function(req, res) {

    let body = req.body;

    if (body.nombre === undefined) {

        res.status(400).json({
            ok: false,
            mensaje: 'El campo es necesario'
        });

    } else {
        res.json({
            persona: body
        });
    }
});



// PUT => Para ACTUALIZAR registros
app.put('/usuario/:id', function(req, res) {

    let id = req.params.id;

    res.json({ // Retorna lo que sea que se envie por URL
        url: id
    });
});





// DELETE => Para ELIMINAR registros
app.delete('/usuario', function(req, res) {
    res.json('delete Usuario');
});



app.listen(process.env.PORT, () => {
    console.log('Escuchando el puerto: ', process.env.PORT);
});