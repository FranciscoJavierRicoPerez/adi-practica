const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: "./database.db"
    }
})

var getUsuario = function(id){
    var usuario = knex('usuarios').where('id', id);
    return usuario.then(function(usuario){ return usuario })
}


module.exports = {
    getUsuario
}