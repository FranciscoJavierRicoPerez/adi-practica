const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: "./database.db"
    }
})

// Select: Devuelve todos los videojuegos que hay en la base de datos
var getAllVideojuegosEnBBDD = function(){
    var videojuegos = knex.select().from('videojuegos');
    return videojuegos.then( function(videojuegos){ return videojuegos} );
}

// Select: Devuelve el videojuego que tiene tiene como id el pasado como parametro
var getVideojuegoEnBBDD = function(id){
    var videojuego = knex('videojuegos').where('id', id);
    return videojuego.then(function(videojuego){ return videojuego });
}

var insertarVideojuegoEnBBDD = function(videojuego_nuevo){
    var videojuego = knex('videojuegos').insert(
        [
            {
                name : videojuego_nuevo.name,
                genre : videojuego_nuevo.genre,
                pegi : videojuego_nuevo.pegi,
                platform : videojuego_nuevo.platform,
                developers : videojuego_nuevo.developers
            }
        ]
    );
    return videojuego.then(function(videojuego){ return videojuego});
}

module.exports = {
    getAllVideojuegosEnBBDD,
    getVideojuegoEnBBDD,
    insertarVideojuegoEnBBDD
}

// Select: Devuelve todos los usuarios de la base de datos
/*var getAllUsuarios = function(){
    var usuarios = knex.select().from('usuarios');
    return usuarios.then( function(usuarios){ return usuarios} );
}*/
