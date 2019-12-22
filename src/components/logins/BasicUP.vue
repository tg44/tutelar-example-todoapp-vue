<template>
  <v-card class="elevation-12">
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field prepend-icon="mdi-account" name="username" label="Username" type="text"
                      v-model="username" required>
        </v-text-field>
        <v-text-field prepend-icon="mdi-lock" name="password" label="Password" id="password"
                      type="password" required v-model="password" :rules="passwordRules">
        </v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" :disabled="!valid" @click="login">Login</v-btn>
      <v-btn color="secondary" :disabled="!valid" @click="register">Register</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
  export default {
    data() {
      return {
        valid: false,
        username: '',
        password: '',
        passwordRules: [
          v => !!v || 'Password is required',
          v =>
            v.length >= 6 ||
            'Password must be greater than 6 characters'
        ]
      };
    },
    methods: {
      login() {
        const userData = {
          username: this.username,
          password: this.password
        };
        this.$store.dispatch("loading");
        this.$store
          .dispatch("loginBasic", userData)
          .then(() => {
            if (this.$store.getters.entryUrl) {
              this.$router.replace(this.$store.getters.entryUrl);
            } else {
              this.$router.replace("/");
            }
          })
          .catch(err => {
            this.$store.dispatch("onError", err); // error handling done in store
          });
      },
      register() {
        const userData = {
          username: this.username,
          password: this.password
        };
        this.$store.dispatch("loading");
        this.$store
          .dispatch("registerBasic", userData)
          .then(() => {
            if (this.$store.getters.entryUrl) {
              this.$router.replace(this.$store.getters.entryUrl);
            } else {
              this.$router.replace("/");
            }
          })
          .catch(err => {
            this.$store.dispatch("onError", err); // error handling done in store
          });
      },
    }
  }
</script>
