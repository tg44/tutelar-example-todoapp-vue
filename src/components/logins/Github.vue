<template>
  <v-card class="elevation-12" height="inherit">
    <v-card-text>
      <v-btn @click="onClick()">
        <v-icon left>mdi-github-circle</v-icon>
        Sign in with GitHub
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    methods: {
      onClick() {
        this.$store.dispatch("loginGithub")
      }
    }
  }
</script>
