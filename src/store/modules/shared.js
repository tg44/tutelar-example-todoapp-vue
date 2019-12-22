
import Vue from "vue";
import router from "../../router";

const state = {
  loading: false,
  snackBar: {
    show: false,
    snackBarType: null,
    message: null
  },
  errorMessage: []
};

const mutations = {
  HEALTH_CHECK(state, serverStatus) {
    state.healthCheck = serverStatus;
  },
  SNACKBAR(state, response) {
    Vue.set(state.snackBar, "show", !state.snackBar.show);
    Vue.set(state.snackBar, "snackBarType", response);
    // state.snackBar.show = !state.snackBar.show;

    // state.snackBar.snackBarType = response.toString();
  },
  CLOSE_SNACKBAR(state) {
    Vue.set(state.snackBar, "show", false);
  },
  TOGGLE_LOADING(state) {
    state.loading = !state.loading;
  },
  SET_ERRORMSG(state, msg) {
    state.errorMessage.push(msg);
  },
  RESET_SNACKBAR(state, response) {
    Vue.set(state.snackBar, "show", !state.snackBar.show);
    Vue.set(state.snackBar, "snackBarType", response.type);
    Vue.set(state.snackBar, "message", response.msg);
    // state.snackBar.show = !state.snackBar.show;

    // state.snackBar.snackBarType = response.toString();
  }
};

const actions = {
  loading({ commit }) {
    commit("TOGGLE_LOADING");
  },
  successSnackBar({ commit, dispatch }) {
    commit("SNACKBAR", "success");
    dispatch("snackBarTimeOut");
  },
  successMessageSnackbar({ commit, dispatch }, msg) {
    commit("RESET_SNACKBAR", { type: "success", msg: msg });
    dispatch("snackBarTimeOut");
  },
  failSnackbar({ commit, dispatch }) {
    commit("SNACKBAR", "error");
    dispatch("snackBarTimeOut");
  },
  failMessageSnackbar({ commit, dispatch }, msg) {
    commit("RESET_SNACKBAR", { type: "error", msg: msg });
    dispatch("snackBarTimeOut");
  },
  snackBarTimeOut({ commit }) {
    setTimeout(() => commit("CLOSE_SNACKBAR"), 3000);
  },

  closeSnackBar({ commit }) {
    commit("CLOSE_SNACKBAR");
  },
  getEntryPath({ commit }, payload) {
    commit("SET_ENTRYURL", payload);
  },
  onError({ commit }, msg) {
    commit("SET_ERRORMSG", msg);
    router.push({
      path: "/error"
    });
  }

};

const getters = {
  loading: state => {
    return state.loading;
  },
  snackBar: state => {
    return state.snackBar;
  },
  errorMessage: state => {
    return state.errorMessage;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
