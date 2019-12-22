<template>
  <v-container fill-height>
      <v-card class="mx-auto" max-width="1024" min-width="800">
        <v-toolbar flat color="primary" dark>
          <v-toolbar-title>Login/Register</v-toolbar-title>
        </v-toolbar>
        <v-tabs vertical class="my-tabs">
          <v-tab>
            <v-icon left>mdi-account</v-icon>
            User/Password
          </v-tab>
          <v-tab>
            <v-icon left>mdi-github-circle</v-icon>
            Github
          </v-tab>

          <v-tab-item>
            <BasicUP></BasicUP>
          </v-tab-item>
          <v-tab-item>
            <Github></Github>
          </v-tab-item>
        </v-tabs>
      </v-card>
  </v-container>
</template>
<script>
  import BasicUP from './logins/BasicUP.vue'
  import Github from './logins/Github.vue'

  export default {
    name: 'login',
    components: {
      BasicUP,
      Github
    }
  }
</script>

<style>
  div.my-tabs [role="tab"] {
    justify-content: flex-start;
  }
</style>
