const { json } = require('body-parser');
var express = require('express');
var router = express.Router();

var underscore = require('underscore');

var usuarios = require('../sample.json');


// Rutas de los usuarios => localhost:8000/usuarios/...

// Muesta a todos los USUARIOS que tenemos en nuestra sistema de almacenamiento de datos
router.get('/', function(req, res){
    res.json(usuarios);
});

router.post('/', function(req, res){
    const { name, surnames, dni, email, password } = req.body;
    if(name && surnames && dni && email && password){
        var id = usuarios.length + 1;
        var nuevo_usuario = {...req.body, id}; // Esta pasando todos los datos a la vez (name, password etc...)
        console.log(nuevo_usuario);
        usuarios.push(nuevo_usuario);
        res.json(usuarios);
    }
    else{
        res.status(500).json({error: 'Ha habido un error'});
    }
});

router.put('/:id', function(req, res){
    var id = req.params.id;
    const { name, surnames, dni, email, password } = req.body;
    if(name && surnames && dni && email && password){
        underscore.each(usuarios, function(usuario, i){
            if(usuario.id == id){
                usuario.name = name;
                usuario.surnames = surnames;
                usuario.dni = dni;
                usuario.email = email;
                usuario.password = password;
            }
        });
        res.json(usuarios);
    }
    else{
        res.status(500).json({error: 'Ha habido un error'});
    }
});


router.delete('/:id', function(req, res){
    var id = req.params.id;
    underscore.each(usuarios, function(usuario, i){
        if(usuario.id == id){
            usuarios.splice(i, 1); // usuarios.splice(i, 1) donde i => es la posición donde esta y el 1 es la cantidad de elementos que quiero eliminar
        }
    });
    res.send(usuarios);
})

module.exports = router;