<template>
    <div id="app">
        <div id="nav" v-if="authenticated">
            <v-navigation-drawer dark v-model="drawer" :mini-variant="mini" enable-resize-watcher app>
                <v-list class="pa-1">
                    <v-list-tile v-if="mini" @click.stop="mini = false">
                        <v-list-tile-action>
                            <v-icon>mdi-arrow-right</v-icon>
                        </v-list-tile-action>
                    </v-list-tile>
                    
                    <v-list-tile avatar tag="div">
                        <v-avatar class="mr-2">
                            <img :src="this.loggedUser.picture">
                        </v-avatar>

                        <v-list-tile-content>
                            <v-list-tile-title class="subheading">{{ this.loggedUser.name }}</v-list-tile-title>
                        </v-list-tile-content>

                        <v-list-tile-action v-if="!mini">
                            <v-btn icon @click.stop="mini = true">
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

            <v-toolbar dark class="blue darken-1" enable-resize-watcher app>
                <v-btn icon @click.stop="drawer = !drawer;"><v-icon>mdi-menu</v-icon></v-btn>
                <v-toolbar-title>{{this.$router.currentRoute.name}}</v-toolbar-title>
            </v-toolbar>
        </div>
        <v-content fluid>
            <router-view @authenticated="setAuthenticated" @loggedUser="setLoggedUser"/>
        </v-content>
    </div>
</template>

<script>
    export default {
        name: 'App',
        data() {
            return {
                drawer: false,
                mini: false,
                authenticated: false,
                loggedUser: null,
            };
        },
        mounted() {
            const user = this.$store.getters.getUserLogged;
            if (user == null) {
                this.$router.replace({ name: 'Login' });
            } else {
                if (this.$router.currentRoute.name === 'Login') {
                    this.$router.replace({ name: 'Dashboard' });
                }
                if (this.$router.currentRoute.name === 'NotFound') {
                    this.$router.replace({ name: 'NotFound' });
                } else {
                    this.setLoggedUser(user);
                    this.setAuthenticated(true);
                }
            }
        },
        methods: {
            setLoggedUser(user) {
                this.$set(this, 'loggedUser', user);
            },
            setAuthenticated(status) {
                this.$set(this, 'authenticated', status);
            },
            resetDrawer() {
                this.$set(this, 'drawer', false);
                this.$set(this, 'mini', false);
            },
            logout() {
                this.resetDrawer();
                this.setAuthenticated(false);
                this.setLoggedUser({ name: '', picture: '' });
                this.$store.commit('logoutSession');
                window.localStorage.removeItem('vuex');
            },
        },
    };
</script>