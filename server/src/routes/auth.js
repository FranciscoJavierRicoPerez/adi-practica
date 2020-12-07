var express = require('express');
var router = express.Router();

var database_usuarios = require('../database/usuarios_db');

var jwt = require('jwt-simple');

secret = "123456";


router.post('/login', async function(req, res){
    var email = req.body.email;
    var password = req.body.password;
    var usuario = await database_usuarios.getUsuarioByEmailAndPassword(email, password);
    if(usuario.length > 0){
        var token = jwt.encode({email: usuario.email}, secret);
        res.send({ mensaje : "OK", token : token, name : usuario[0].name, id : usuario[0].id });
    }
    else{
        res.send(401).json({error : "No se ha encontrado el usuario con esas credenciales"});
    }
});

module.exports = router;