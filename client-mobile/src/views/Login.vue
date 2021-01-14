<template>
 <ion-page>
    <div id="login">
        <h1>INICIO DE SESIÓN</h1>
        <form @submit.prevent="handleLogin">
            <ion-item>
                <ion-label position="floating">Correo Electronico</ion-label>
                <ion-input  v-model="usuario.email"></ion-input>
            </ion-item>
            <ion-item>
                <ion-label position="floating">Contraseña</ion-label>
                <ion-input v-model="usuario.password" type="password"></ion-input>
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
                email:"",
                password:""
            }
        };
    },
    methods: {
        handleLogin() {
            fetch('http://localhost:9999/login', {
                method: 'POST',
                body: JSON.stringify(this.usuario),
                headers: {
                    'Accept' : 'application/json',
                    'Content-type' : 'application/json'
                }
            })
            .then(res => {
                return res.json();
            })
            .then(res => {
                localStorage.setItem('usuario.token', res.token)
                localStorage.setItem('usuario.id', res.id)
                localStorage.setItem('usuario.name', res.name)
                window.location.href='http://localhost:8100';
            })
        },
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