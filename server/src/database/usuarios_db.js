const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: "./database.db"
    }
})

// Select: Devuelve todos los usuarios de la base de datos
var getAllUsuarios = function(){
    var usuarios = knex.select().from('usuarios');
    return usuarios.then( function(usuarios){ return usuarios} );
}

// Select: Devuelve el usuario de la base de datos con el ID pasado como parametro
var getUsuario = function(id){
    var usuario = knex('usuarios').where('id', id);
    return usuario.then(function(usuario){ return usuario })
}

// Insert: Insertar una nuevo usuario en la base de datos
var insertarUsuarioEnBBDD = function(nuevo_usuario){ // la funcion recibira los parametros de los usuarios 
    // crear el nuevo usuario
    var usuario = knex('usuarios').insert(
        {
            name : nuevo_usuario.name,
            surnames : nuevo_usuario.surnames,
            dni : nuevo_usuario.dni,
            email : nuevo_usuario.email,
            password : nuevo_usuario.password
        }   
    );
    return usuario.then(function(usuario){ return usuario })
}


//Update: Actualizar un usuario que ya exise en la base de datos

var actualizarUsuarioEnBBDD = function(usuario){
    var usuario = knex('usuarios').update({
        name: usuario.name,
        surnames : usuario.surnames,
        dni : usuario.dni,
        email : usuario.email,
        password : usuario.password
    }).where('id', usuario.id);
    return usuario.then(function(usuario){ return usuario})
}

//Delete: Borrar un usuario de la base de datos
var borrarUsuarioEnBBDD = function(dni){
    var usuario = knex('usuarios').delete().where('dni', dni);
    return usuario.then(function(usuario){ return usuario });
}


var getUsuarioByEmailAndPassword = function(email, password){
    var usuario = knex('usuarios').where('email', email).where('password', password);
    return usuario.then(function(usuario){ return usuario});
}

module.exports = {
    getUsuario,
    getAllUsuarios,
    insertarUsuarioEnBBDD,
    actualizarUsuarioEnBBDD,
    borrarUsuarioEnBBDD,
    getUsuarioByEmailAndPassword
}