var express = require('express');
var app = express();
var morgan = require('morgan');


app.use(morgan('dev'));
app.use(express.json());


var principalApp = require('./routes/index');
app.use('/', principalApp);

var usuariosApp = require('./routes/usuarios');
app.use('/usuarios', usuariosApp);

app.listen(3000, function(){
    console.log('El servidor esta en el puerto 3000');
});