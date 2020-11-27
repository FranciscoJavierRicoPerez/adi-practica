var express = require('express');
var app = express();
var morgan = require('morgan');


app.use(morgan('dev'));
app.use(express.json());

var authApp = require('./routes/auth');
app.use('/', authApp);

var usuariosApp = require('./routes/usuarios'); // Obtengo en la variable usuariosApp todos los metodos de las rutas definidas en el fichero usuarios.js en la carpeta routes
app.use('/usuarios', usuariosApp); // Defino el princio de la ruta que van a tener los metodos del archivo usuarios.js

var videojuegosApp = require('./routes/videojuegos');
app.use('/videojuegos', videojuegosApp);


app.listen(9999, function(){
    console.log('El servidor esta en el puerto 9999');
});