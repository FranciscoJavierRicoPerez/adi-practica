<template>
    <ion-page>
    <div id="listado">
   <ion-list>
        <tr v-for="(videojuego, id) of videojuegos" v-bind:key="id">
            <ion-item>
                <td>{{videojuego.name}}</td>
                <td>{{videojuego.genre}}</td>
                <td>
                    <ion-button fill="outline" color="danger" @click="deleteVideojuego(videojuego.id)">Eliminar</ion-button>
                </td>
            </ion-item>
        </tr>
   </ion-list> 
    </div>
    </ion-page>
</template>

<script>

import { IonList, IonItem, IonButton, IonPage } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ListadoVideojuegos',
    components: {
    IonList,
    IonItem,
    IonButton,
    IonPage
  },
    data(){
        return{
            videojuegos: [], // ARRAY DEFINIDO EN LOCAL PARA PODER ALAMACENARME LOS VIDEOJUEGOS QUE VENGAN DEL SERVIDOR 
        }
    },
    created(){
        this.getVideojuegos()
    },
    methods: {
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
            .then(() => {
                this.getVideojuegos()
            })
        },
    }
})
</script>

<style scoped>
#listado {
  text-align: center;
  
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#listado strong {
  font-size: 20px;
  line-height: 26px;
}

#listado p {
  font-size: 16px;
  line-height: 22px;
  
  color: #8c8c8c;
  
  margin: 0;
}

#listado a {
  text-decoration: none;
}
</style>