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
    </ion-header>


    <ion-router-outlet />
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet, IonButton } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
    IonButton
  }
});
</script>