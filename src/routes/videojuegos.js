var express = require('express');
var router = express.Router();

var underscore = require('underscore'); // PARA PODER RECORRER COLECCIONES underscore.each(...)

var videojuegos = require('../videojuegos_sample.json'); // Obtiene un array con todos los videojuegos que tengo definidios en mi videojuegos.json y los que añada posteriormente


//Muestra todos los videojuegos que tenemos en nuestra base de datos
router.get('/', function(req, res){
    if(videojuegos.length > 0){
        //console.log(videojuegos);
        res.status(200).json(videojuegos);
    }
    else{
        res.status(500).json({error : "No existen videojuegos"});
    }
});

// Muestra el videojuego con el id pasado como parametro
router.get('/:id', function(req, res){
    var id = req.params.id; // Obtengo de los parametros de la ruta el id
    var encontrado = false;
    underscore.each(videojuegos, function(videojuego, i){
        if(videojuego.id == id){
            encontrado = true;
            //console.log(videojuego);
            res.status(200).json(videojuego);
        }
    });
    if(!encontrado){
        res.status(500).json({error : "El id solicitado no se ha encontrado"});
    }
});

// Añade un nuevo videojuego a la base de datos
router.post('/', function(req, res){
    const { name, genre, developers, pegi, platform } = req.body;
    if(name && genre && developers && pegi && platform){
        var id = videojuegos.length + 1;
        var nuevo_videojuego = {...req.body, id};
        videojuegos.push(nuevo_videojuego);
        res.status(200).json(videojuegos);
    }
    else{
        res.status(500).json({error : "Algun campo es incorrecto"});
    }
});

module.exports = router;
