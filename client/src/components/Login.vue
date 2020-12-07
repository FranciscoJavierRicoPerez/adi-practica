<template>
    <div id="loginBox">
        <h2 style="text-align: center">INICIAR SESIÓN</h2>
        <div class="container">
            <div class="row">
                <div class="col-md-3" style="left: 38%">
                    <b-card border-variant="info">
                        <form @submit.prevent="handleLogin">
                            <b-form-group label="Email">
                                <b-form-input v-model="user.email" placeholder="Email"></b-form-input>
                            </b-form-group>
                            <b-form-group label="Contraseña">
                                <b-form-input v-model="user.password" placeholder="Password" type="password"></b-form-input>
                            </b-form-group>
                            <b-button type="submit" block variant="outline-primary">Iniciar sesión</b-button>
                        </form>
                    </b-card>
                </div>
            </div>
        </div>
        <h6 style="text-align: center; margin-top: 15px">¿No tienes cuenta?</h6>
        <h6 style="text-align: center">Registrate <router-link to="/register">aquí</router-link></h6>
    </div>
</template>

<script>
    class User {
        constructor(email, password) {
            this.email = email;
            this.password = password;
        }
    }
    export default {
        name: 'App',
        data(){
            return {
                user: new User(),
            }
        },
        computed: {
            loggedIn() {
                return this.$store.state.auth.status.loggedIn;
            }
        },
        created(){
            if (this.loggedIn) {
                this.$router.push('/home');
            }
        },
        methods: {
            handleLogin() {
                this.loading = true;
                this.$store.dispatch('auth/login', this.user).then(
                    () => {
                    this.$router.push('/home');
                    },
                    error => {
                        this.loading = false;
                        this.message =
                            (error.response && error.response.data && error.response.data.message) 
                            error.message 
                            error.toString();
                    }
                );
            }
        }
    }
</script>