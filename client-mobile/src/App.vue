<template>
  <ion-app>
    
    <ion-header>
      <ion-button routerLink="/home">
        Pagina Principal
      </ion-button>
      <ion-button routerLink="/videojuegos">
        Videojuegos
      </ion-button>
      <ion-button routerLink="/crearVideojuego">
        Añadir Videojuego
      </ion-button>
      <div v-if="!currentUser">
        <ion-button routerLink="/login">
          Iniciar Sesión
        </ion-button>
      </div>
      <div v-if="currentUser">
        <ion-button @click="logout">
          Cerrar Sesión
        </ion-button>
      </div>
    </ion-header>


    <ion-router-outlet />
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet, IonButton, IonHeader } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
    IonButton, 
    IonHeader
  },
  methods:{
    logout(){
      localStorage.removeItem('usuario.name')
      localStorage.removeItem('usuario.id')
      localStorage.removeItem('usuario.token')
      window.location.href = 'http://localhost:8100/login';
    }
  },
  computed: {
        currentUser() {
            const userName = localStorage.getItem('usuario.name')
            const userId = localStorage.getItem('usuario.id')
            const token = localStorage.getItem('usuario.token')
            if(userName && userId && token){
                 return {
                    userName: userName,
                    userId: userId,
                    token: token,
                }
            } else {
                return null
            }
        },
    },
});
</script>