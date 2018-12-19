<template>
  <v-app id="login">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login</v-toolbar-title>
              </v-toolbar>
                <v-card-text>
                  <v-form>
                    <v-text-field prepend-icon="mdi-account" name="login" label="Username"
                    :rules="[rules.required]" type="text" v-model="input.username" v-on:click="() => error = null"></v-text-field>
                    <v-text-field prepend-icon="mdi-lock" name="password" label="Password"
                    :rules="[rules.required]" type="password" v-model="input.password" v-on:click="() => error = null" ></v-text-field>

                    <v-alert v-if="error" :value="true" color="error" icon="mdi-alert" outline>
                      {{error}}
                    </v-alert>

                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-progress-circular v-if="loading" indeterminate color="red" />
                  <v-spacer></v-spacer>
                  <v-btn color="primary" v-on:click="login()" :disabled="!input.username || !input.password || loading">Login</v-btn>
                </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        drawer: null,
        loading: false,
        rules: {
          required: (value) => !!value || 'Required.',
        },
        error: null,
        input: {
          username: '',
          password: '',
        },
      };
    },
    methods: {
      login() {
        this.loading = true;
        if (this.input.username !== '' && this.input.password !== '') {
          const user = this.$store.getters.getUserAccount(this.input.username, this.input.password);
          if (user != null) {
            this.$store.commit('saveSession', user.id);
            this.$emit('loggedUser', user);
            this.$emit('authenticated', true);
            this.$router.replace({ name: 'Dashboard' });
            this.loading = false;
          } else {
            this.error = 'The username and / or password is incorrect';
            this.loading = false;
          }
        } else {
            this.error = 'A username and password must be present';
            this.loading = false;
        }
      },
    },
  };
</script>