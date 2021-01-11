<template>
 <ion-page>
    <div id="login">
        <h1>INICIO DE SESIÓN</h1>
        <form @submit.prevent="handleLogin">
            <ion-item>
                <ion-label position="floating">Correo Electronico</ion-label>
                <ion-input  type="text"></ion-input>
            </ion-item>
            <ion-item>
                <ion-label position="floating">Contraseña</ion-label>
                <ion-input type="text"></ion-input>
            </ion-item>
            <ion-button type="submit">Iniciar Sesión</ion-button>
        </form>
    </div>
 </ion-page>
</template>

<script>

import {  IonPage, IonLabel, IonInput, IonButton, IonItem} from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Login',
    components:{
        IonPage,
        IonLabel,
        IonInput,
        IonButton,
        IonItem
    },
    data(){
        return{
            usuario:{
                name:"",
                password:""
            }
        };
    },
    methods: {
            handleLogin() {
                fetch('http://localhost:9999/login')
            }
        }
})
</script>

<style scoped>
#login {
  text-align: center;
  
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#login strong {
  font-size: 20px;
  line-height: 26px;
}

#login p {
  font-size: 16px;
  line-height: 22px;
  
  color: #8c8c8c;
  
  margin: 0;
}

#login a {
  text-decoration: none;
}
</style>