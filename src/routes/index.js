var express = require('express');
var router = express.Router();
// Rutas de la pagina principal => localhost:3000/

router.get('/', function(req, res){
    res.json({"Pagina Principal":"Principal Page"});
});

module.exports = router;