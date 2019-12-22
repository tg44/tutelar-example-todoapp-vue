<template>
  <div></div>
</template>

<script>
  export default {
    created() {
      const data = {token: this.$route.query.token, refreshToken: this.$route.query.refreshToken};
      console.log(data);
      this.login(data);
    },
    methods: {
      login(data) {
        this.$store.dispatch("loading");
        this.$store
          .dispatch("login", data)
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
