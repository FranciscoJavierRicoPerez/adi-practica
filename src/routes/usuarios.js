//const { json } = require('body-parser');
var express = require('express');
var router = express.Router();

var database_usuarios = require('../database/usuarios_db');

var auth = require('./auth');

var underscore = require('underscore'); // PARA RECORRER COLECCIONES

var jwt = require('jwt-simple');

secret = "123456";


/**
 * HACER LAS COSAS CON LOS DATOS DE LA BASE (database_usuarios) DE DATO EN VEZ DE LOS DE LOCAL
 */

// Rutas de los usuarios => localhost:8000/usuarios/...

// Muesta a todos los USUARIOS que tenemos en nuestra sistema de almacenamiento de datos
router.get('/', async function(req, res){
    var usuarios = await database_usuarios.getAllUsuarios();
    if(usuarios.length > 0){
        res.status(200).json(usuarios);
    }
    else{
        res.status(500).json({error : "No existen usuarios"});
    }
});

// Creación de un usuario nuevo (Registrar)
router.post('/', async function(req, res){
    const {name, surnames, dni, email, password } = req.body;
    if(name && surnames && dni && email && password){
        //var id = usuarios.length + 1;
        var nuevo_usuario = {...req.body}; // Esta pasando todos los datos a la vez (name, password etc...)
        console.log(nuevo_usuario);
        database_usuarios.insertarUsuarioEnBBDD(nuevo_usuario);
        res.json( await database_usuarios.getAllUsuarios());
    }
    else{
        res.status(500).json({error: 'Ha habido un error'});
    }
});

// Modificación del usuario que tenga el id pasado como parametro 
router.put('/:id', async function(req, res){
    var id = req.params.id;
    const { name, surnames, dni, email, password } = req.body;
    if(name && surnames && dni && email && password){
        underscore.each(await database_usuarios.getAllUsuarios(id), function(usuario, i){
            if(usuario.id == id){
                usuario.name = name;
                usuario.surnames = surnames;
                usuario.dni = dni;
                usuario.email = email;
                usuario.password = password;
                database_usuarios.actualizarUsuarioEnBBDD(usuario);
            }
        });
        res.status(200).json(await database_usuarios.getUsuario(id));
    }
    else{
        res.status(500).json({error: 'Ha habido un error'});
    }
});

// Borrado del usuario que tenga el id pasado como parametro
router.delete('/:id', async function(req, res){
    var id = req.params.id;
    var borrado = false;
    var usuarios = await database_usuarios.getAllUsuarios();
    underscore.each(usuarios, async function(usuario, i){
        if(usuario.id == id){
            //usuarios.splice(i, 1); // usuarios.splice(i, 1) donde i => es la posición donde esta y el 1 es la cantidad de elementos que quiero eliminar
            database_usuarios.borrarUsuarioEnBDD(id);
            borrado = true;
            usuarios = await database_usuarios.getAllUsuarios();
            res.status(200).json(usuarios);
        }
    });
    if(!borrado){
        res.status(500).json({ error : 'No se ha podido borrar el usuario'})
    }
})

// Obtener el usuario que tiene el ID que se ha pasado como parametro
router.get('/:id', chequeaJWT, async function(req, res){
    var usuario = await database_usuarios.getUsuario(req.params.id);
    if(usuario.length > 0){
        res.status(200).json(usuario[0]);
    }
    else{
        res.status(500).json({error : "No se ha encontrado al usuario"});
    }
});

function chequeaJWT(req, res, next){
    var tokenOk = false;
    var cabecera = req.header('Authorization');
    var campos = cabecera.split(' ');
    console.log(campos)
    if(campos.length > 1 && cabecera.startsWith('Bearer')){
        var token = campos[1];
        tokenOk = jwt.decode(token, secret)
    }
    if(tokenOk){
        next();
    }
    else{
        res.status(403).send({ mensaje : "No tienes permisos" });
    }
}

module.exports = router;