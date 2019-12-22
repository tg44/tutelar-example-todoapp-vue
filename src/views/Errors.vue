<template>
  <v-container>
    <v-layout column fill-height align-center>
      <v-flex xs1>
        <v-icon color="yellow" size="200px">mdi-alert</v-icon>
      </v-flex>
      <v-flex xs1>
        <span v-for="error in errorMessage" :key="error">{{ error }}</span>
      </v-flex>
      <v-flex xs1 mt-3>
        <v-layout row wrap>
          <v-flex>
            <v-btn @click="retry">{{ $t("retryBtn") }}</v-btn>
          </v-flex>
          <v-flex>
            <v-btn @click="goHome" flat outlined>{{ $t("homeBtn") }}</v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["errorMessage"])
  },
  methods: {
    retry() {
      // Goes back 1 page
      this.$router.go(-1);
    },
    goHome() {
      // Pushes router to landing route
      this.$router.push({ path: "/" });
    }
  }
};
</script>

<style></style>
