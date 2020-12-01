<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="/home">VIDEOJUEGOS-ADI</b-navbar-brand>
      <b-navbar-nav>
        <b-nav-item href="/videojuegos">Videojuegos</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  
}
</script>
