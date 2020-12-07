<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="/home">VIDEOJUEGOS-ADI</b-navbar-brand>
      <b-navbar-nav>
        <b-nav-item href="/videojuegos">Videojuegos</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
          <router-link to="/login" style="text-decoration: none" v-if="!currentUser">
            <b-button id="loginButton" variant="outline-light" class="mb-2">
              <b-icon icon="box-arrow-in-right" aria-hidden="true"></b-icon> Login
            </b-button>
          </router-link>
          <b-nav-item-dropdown right v-if="currentUser">
            <template #button-content>
              <em>{{currentUser.name}}</em>
            </template>
            <b-dropdown-item href @click.prevent="logOut">Cerrar Sesión</b-dropdown-item>
          </b-nav-item-dropdown> 
        </b-navbar-nav>
    </b-navbar>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    currentUser() {
      return this.$store.state.auth.user
    }
  },
  methods: {
    logOut(){
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
}
</script>
