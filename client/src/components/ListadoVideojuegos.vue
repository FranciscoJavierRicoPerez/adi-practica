<template>
    <div>
        <div align="center">
            <h5>Listado Videojuegos</h5>
        </div>
        <div class="container">
            <div class="row pt-5">
                <div class="col md-5">
                    <div class="card">
                        <div class="card-body">
                            <form @submit.prevent="addVideojuego">
                                <div class="form-group">
                                    <input v-model="videojuego.name" type="text" placeholder="Nombre" class="form-control">
                                </div>
                                <div class="form-group">
                                    <input v-model="videojuego.genre" type="text" placeholder="Genero" class="form-control">
                                </div>
                                <div class="form-group">
                                    <input v-model="videojuego.pegi" type="text" placeholder="PEGI" class="form-control">
                                </div>
                                <div class="form-group">
                                    <input v-model="videojuego.platform" type="text" placeholder="Plataforma" class="form-control">
                                </div>
                                <div class="form-group">
                                    <input v-model="videojuego.developers" type="text" placeholder="Desarrolladores" class="form-control">
                                </div>
                                <b-button block variant="primary" type="submit">Añadir Videojuego</b-button>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="col-md-7">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Genero</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="videojuego of videojuegos">
                                <td>{{videojuego.name}}</td>
                                <td>{{videojuego.genre}}</td>
                                <td>
                                    <b-button variant="outline-danger" @click="deleteVideojuego(videojuego.id)">Eliminar</b-button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>    
</template>

<script>

class Videojuego{
    
    constructor(name, genre, pegi, developers, platform){
        this.name = '';
        this.genre = '';
        this.pegi = '';
        this.developers = '';
        this.platform = '';
    }

}

export default {
    data(){
        return{
            videojuego: new Videojuego(),
            videojuegos: [], // ARRAY DEFINIDO EN LOCAL PARA PODER ALAMACENARME LOS VIDEOJUEGOS QUE VENGAN DEL SERVIDOR
            fields: ['Nombre', 'Genero'] // CAMPOS QUE SE MUESTRAN EN LA TABLA 
        }
    },
    created(){
        this.getVideojuegos()
    },
    methods: {
        addVideojuego(){
            fetch('http://localhost:9999/videojuegos', {
                method: 'POST',
                body: JSON.stringify(this.videojuego),
                headers: {
                    'Accept' : 'application/json',
                    'Content-type' : 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => { 
                this.getVideojuegos()
            })
            this.videojuego = new Videojuego();
        },
        getVideojuegos(){
            fetch('http://localhost:9999/videojuegos')
            .then(res => res.json())
            .then(data => {
                this.videojuegos = data;
                console.log(this.videojuegos)
            });
        },
        deleteVideojuego(id){
            fetch('http://localhost:9999/videojuegos/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-type' : 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                this.getVideojuegos()
            })
        },
    }
}
</script>