<template>
    <ion-page>
        <div id="formulario">
            <form @submit.prevent="addVideojuego">
                <ion-item>
                    <ion-label position="floating">Nombre</ion-label>
                    <ion-input v-model="videojuego.name" type="text"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-label position="floating">Genero</ion-label>
                    <ion-input v-model="videojuego.genre" type="text"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-label position="floating">PEGI</ion-label>
                    <ion-input v-model="videojuego.pegi" type="text"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-label position="floating">Plataforma</ion-label>
                    <ion-input v-model="videojuego.platform" type="text"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-label position="floating">Desarrolladores</ion-label>
                    <ion-input v-model="videojuego.developers" type="text"></ion-input>
                </ion-item>
                <ion-button type="submit">Añadir Juego</ion-button>
            </form>
        </div>
    </ion-page>
</template>

<script>
import {  IonPage, IonInput, IonLabel, IonItem, IonButton } from '@ionic/vue';
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'CrearVideojuego',
    components:{
        IonPage,
        IonInput,
        IonLabel,
        IonItem,
        IonButton
    },
    data(){
        return{
            videojuego:{
                name:"",
                genre:"",
                platform:"",
                developers:"",
                pegi:""
            }
        };
    },
    methods:{
        addVideojuego(){
            fetch('http://localhost:9999/videojuegos', {
                method: 'POST',
                body: JSON.stringify(this.videojuego),
                headers: {
                    'Accept' : 'application/json',
                    'Content-type' : 'application/json'
                }
            })
            .then(res => {
                res.json()
                window.location.href = 'http://localhost:8100/videojuegos';
            })
        },
    },
});
</script>

<style scoped>
#formulario {
  text-align: center;
  
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#formulario strong {
  font-size: 20px;
  line-height: 26px;
}

#formulario p {
  font-size: 16px;
  line-height: 22px;
  
  color: #8c8c8c;
  
  margin: 0;
}

#formulario a {
  text-decoration: none;
}
</style>