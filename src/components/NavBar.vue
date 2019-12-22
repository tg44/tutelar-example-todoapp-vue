<template>
  <nav>
    <!-- NAVBAR -->

    <v-app-bar
      class="px-0 elevation-1"
      flat
      app
      clipped-left
      extended
      extension-height="7"
    >
      <router-link class="router__toolbar__title" to="/">
        <v-toolbar-title class="grey--text">
          <span class="font-weight-light">Tutelar Example</span>
        </v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <v-btn icon @click="logOut" v-if="isAuthenticated">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
      <v-btn icon @click="logIn" v-if="!isAuthenticated">
        <v-icon>mdi-login</v-icon>
      </v-btn>
      <v-btn icon @click="signUp" v-if="!isAuthenticated">
        <v-icon>mdi-account-plus-outline</v-icon>
      </v-btn>
      <span class="font-weight-light hidden-sm-and-down">
        {{ currentTime }}
      </span>
      <v-progress-linear
        v-if="loading"
        :indeterminate="loading"
        slot="extension"
      ></v-progress-linear>

      <!-- SNACKBAR  -->
      <v-snackbar
        v-model="snackBarShow"
        :bottom="y === 'bottom'"
        :left="x === 'left'"
        :multi-line="mode === 'multi-line'"
        :right="x === 'right'"
        :top="y === 'top'"
        :vertical="mode === 'vertical'"
        :color="snackBarType"
        :timeout="timeout"
      >
        {{ text }}
        <v-btn color="pink" flat @click="closeSnackBar">Close</v-btn>
      </v-snackbar>
    </v-app-bar>
  </nav>
</template>

<script>
  import moment from "moment";

  import { mapGetters } from "vuex";
  import { mapActions } from "vuex";
  export default {
    name: "NavBar",

    data() {
      return {
        drawer: false,
        mode: "",
        y: "top",
        x: null,
        // Timeout has to be 0 in order to manually control it's state vie vuex
        timeout: 0,
        right: null,
        currentTime: null
      };
    },
    computed: {
      ...mapGetters(["loading", "isAuthenticated"]),

      refreshToken() {
        return this.$store.getters.refreshToken;
      },
      getInitials() {
        // TODO does not refresh on getter update, wathcer maybe...
        let name = this.$store.getters.profile.profile
          ? this.$store.getters.profile.profile.name
          : "";
        let names = name.split(" "),
          initials = names[0].substring(0, 1).toUpperCase();

        if (names.length > 1) {
          initials += names[names.length - 1].substring(0, 1).toUpperCase();
        }
        return initials;
      },
      text() {
        const snackBar = this.$store.getters.snackBar;
        if (snackBar.message === null) {
          return snackBar.snackBarType === "error"
            ? "LoginError"
            : "LoginSuccess";
        } else {
          return `${snackBar.message}`;
        }
      },
      snackBarShow() {
        return this.$store.getters.snackBar.show;
      },
      snackBarType() {
        return this.$store.getters.snackBar.snackBarType;
      }
    },
    filters: {
      capitalize: value => {
        if (!value) return "";
        value = value.toString();
        return value.toUpperCase();
      }
    },
    methods: {
      ...mapActions(["closeSnackBar"]),
      logIn() {
        this.$router.push({ name: "login" });
      },
      signUp() {
        this.$router.push({ name: "signup" });
      },
      ...mapActions({
        logOut: "logout"
      }),
      updateCurrentTime() {
        this.currentTime = moment().format("HH:mm:ss ");
      }
    },
    created() {
      this.currentTime = moment().format("HH:mm:ss ");
      setInterval(() => this.updateCurrentTime(), 1 * 1000);
    }
  };
</script>
