<template>
    <div id="app">
        <div id="nav">
            <v-navigation-drawer v-model="drawer" :mini-variant="mini" dark absolute temporary v-if="authenticated">
                <v-list class="pa-1">
                    <v-list-tile v-if="mini" @click.stop="drawer = !drawer">
                    <v-list-tile-action>
                        <v-icon>mdi-arrow-left</v-icon>
                    </v-list-tile-action>
                    </v-list-tile>

                    <v-list-tile avatar tag="div">
                    <v-list-tile-avatar>
                        <img :src="this.loggedUser.picture">
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                        <v-list-tile-title>{{ this.loggedUser.name }}</v-list-tile-title>
                    </v-list-tile-content>

                    <v-list-tile-action>
                        <v-btn icon @click.stop="mini = !mini">
                        <v-icon>mdi-arrow-left</v-icon>
                        </v-btn>
                    </v-list-tile-action>
                    </v-list-tile>
                </v-list>
                    <v-list class="pt-0" dense>
                        <v-divider light></v-divider>
                        <v-list-tile to="/dashboard" replace>
                        <v-list-tile-action>
                            <v-icon>mdi-chart-bar</v-icon>
                        </v-list-tile-action>

                        <v-list-tile-content>
                            <v-list-tile-title>Dashboard</v-list-tile-title>
                        </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile to="/login" v-on:click.native="logout()" replace>
                        <v-list-tile-action>
                            <v-icon>mdi-logout</v-icon>
                        </v-list-tile-action>

                        <v-list-tile-content>
                            <v-list-tile-title>Logout</v-list-tile-title>
                        </v-list-tile-content>
                        </v-list-tile>
                    </v-list>
            </v-navigation-drawer>
            <v-toolbar dark v-if="authenticated">
                <v-btn icon @click.stop="drawer = !drawer; mini = false;"><v-icon>mdi-menu</v-icon></v-btn>
                <v-toolbar-title>{{this.$router.currentRoute.name}}</v-toolbar-title>
                <!-- <router-link to="/login" v-on:click.native="logout()" replace>Logout</router-link>
                <router-link to="/dashboard" replace>Dashboard</router-link> -->
            </v-toolbar>
        </div>
        <router-view @authenticated="setAuthenticated" @loggedUser="setLoggedUser"/>
    </div>
</template>

<script>
    export default {
        name: 'App',
        data() {
            return {
                drawer: null,
                mini: false,
                authenticated: false,
                loggedUser: { name: '', picture: '' },
                account: {
                    username: 'snakeleon',
                    password: '1234',
                },
            };
        },
        mounted() {
            const user = this.$store.getters.getUserLogged;
            if (user == null) {
                this.$router.replace({ name: 'Login' });
            } else {
                if (this.$router.currentRoute.name == 'Login') {
                    this.$router.replace({ name: 'Dashboard' });
                }
                this.setLoggedUser(user);
                this.setAuthenticated(true);
            }
        },
        methods: {
            setLoggedUser(user) {
                this.$set(this, 'loggedUser', user);
            },
            setAuthenticated(status) {
                this.$set(this, 'authenticated', status);
            },
            logout() {
                this.$set(this, 'authenticated', false);
                this.$set(this, 'loggedUser', { name: '', picture: '' });
                this.$store.commit('logoutSession');
            },
        },
    };
</script>

<style>
</style>