<template>
    <div id="app">
        <div id="nav">
            <router-link v-if="authenticated" to="/login" v-on:click.native="logout()" replace>Logout</router-link>
        </div>
        <router-view @authenticated="setAuthenticated" />
    </div>
</template>

<script>
    export default {
        name: 'App',
        data() {
            return {
                authenticated: false,
                account: {
                    username: 'snakeleon',
                    password: '1234',
                },
            };
        },
        mounted() {
          const user = this.$store.getters.getUserLogged;
          if (user == null) {
              this.$router.replace({ name: 'login' });
          } else {
            this.authenticated = true;
          }
        },
        methods: {
            setAuthenticated(status) {
              this.authenticated = status;
            },
            logout() {
              this.authenticated = false;
              this.$store.commit('logoutSession');
            },
        },
    };
</script>

<style>
</style>