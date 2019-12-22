<template>
  <v-container fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Basic User/Password Form</v-toolbar-title>
          </v-toolbar>
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
            <v-btn color="primary" :disabled="!valid" @click="submit">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
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
    submit() {
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
  }
}
</script>
