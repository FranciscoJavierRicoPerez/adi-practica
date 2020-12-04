var express = require('express');
var router = express.Router();

var underscore = require('underscore'); // PARA PODER RECORRER COLECCIONES underscore.each(...)

var database_videojuegos = require('../database/videojuegos_db');

//var videojuegos = require('../videojuegos_sample.json'); // Obtiene un array con todos los videojuegos que tengo definidios en mi videojuegos.json y los que añada posteriormente


//Muestra todos los videojuegos que tenemos en nuestra base de datos
router.get('/', async function(req, res){
    var videojuegos = await database_videojuegos.getAllVideojuegosEnBBDD();
    if(videojuegos.length > 0){
        //console.log(videojuegos);
        res.status(200).json(videojuegos);
    }
    else{
        res.status(500).json({error : "No existen videojuegos"});
    }
});

// Muestra el videojuego con el id pasado como parametro
router.get('/:id', async function(req, res){
    var id = req.params.id; // Obtengo de los parametros de la ruta el id
    var videojuego = await database_videojuegos.getVideojuegoEnBBDD(id);
    if(videojuego.length > 0){
        res.status(200).json(videojuego);
    }
    else{
        res.status(500).json({error : "El videojuego solicitado no se ha encontrado"});
    }
});

// Añade un nuevo videojuego a la base de datos
router.post('/', async function(req, res){
    console.log(req.body);
    const { name, genre, developers, pegi, platform } = req.body;
    if(name && genre && developers && pegi && platform){
        //var id = videojuegos.length + 1;
        var nuevo_videojuego = {...req.body};
        database_videojuegos.insertarVideojuegoEnBBDD(nuevo_videojuego);
        res.status(200).json(await database_videojuegos.getAllVideojuegosEnBBDD());
    }
    else{
        res.status(500).json({error : "Algun campo es incorrecto"});
    }
});

router.delete('/:id', async function(req, res){ 
    var id = req.params.id;
    var borrado = false;
    if(id){
        database_videojuegos.borrarVideojuegoEnBBDD(id);
        borrado = true;
        res.status(200).json({ mensaje : 'Borrado'});
    }
    if(!borrado){
        res.status(500).json({
            error: "No se ha podido borrar el videojuego"
        })
    }
});

module.exports = router;
