import router from "../../router";
import moment from "moment";
import axios from 'axios'

const authClient = axios.create({
  baseURL: process.env.VUE_APP_AUTH_URL
});

// JWT decoder
const jwtDecode = token => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function(c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return JSON.parse(jsonPayload);
};
// Vuex module
const state = {
  refreshToken: null,
  token: null
};
const mutations = {
  // Login
  AUTH_USER(state, userData) {
    state.refreshToken = userData.refreshToken;
    state.token = userData.token;
  },
  // Logout
  CLEAR_AUTH_DATA(state) {
    state.refreshToken = null;
    state.token = null;
  },
  // Refresh token
  REFRESH_TOKEN(state, userData) {
    state.token = userData.token;
  }
};

const actions = {
  doRefreshToken({ commit, dispatch }) {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      router.replace("/login");
      return;
    }
    authClient
      .post("/core/refresh-token", {
        refreshToken: refreshToken,
      })
      .then(res => {
        localStorage.setItem("refreshToken", res.data.refreshToken);
        localStorage.setItem("token", res.data.token);
        commit("AUTH_USER", {
          ...res.data
        });
      })
      .catch(() => {
        dispatch("failMessageSnackbar", "loginFailMsg");
      });
  },
  // Auto refresh
  autoRefreshToken({ commit, dispatch }) {
    const token = localStorage.getItem("token");
    if(!token){
      dispatch("doRefreshToken");
    } else {
      const expirationDate = jwtDecode(token).exp;
      const warnTime = expirationDate - 60;
      const now = Math.floor(moment().valueOf() / 1000);
      let alerted = false;
      commit("AUTH_USER", {
        token: token,
        refreshToken: localStorage.getItem("refreshToken")
      });
      // Start counter
      setInterval(() => {
        if (warnTime <= now && !alerted) {
          dispatch("doRefreshToken");
          alerted = true;
        }
      }, 1000);
    }
  },
  // Login
  loginBasic({ dispatch }, authData) {
    return authClient
      .post("/basic/register", {
        username: authData.username,
        password: authData.password,
      })
      .then(res => {
        localStorage.setItem("refreshToken", res.data.refreshToken);
        localStorage.setItem("token", res.data.token);
        dispatch("autoRefreshToken");
        dispatch("loading");
        dispatch("successMessageSnackbar", "loginSuccessMsg");
      })
      .catch(() => {
        dispatch("loading");
        dispatch("failMessageSnackbar", "loginFailMsg");
      });
  },
  // Auto Login
  tryAutoLogin({ dispatch }) {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      router.replace("/login");
      return;
    }
    const expirationDate = jwtDecode(refreshToken).exp;
    const now = moment().valueOf() / 1000;
    if (now >= expirationDate) {
      dispatch("logout");
      router.replace("/login");
    } else {
      dispatch("autoRefreshToken");
    }
  },

  // Logout
  logout({ commit }) {
    commit("CLEAR_AUTH_DATA");
    localStorage.clear();
    router.replace("/login");
  }
};

const getters = {
  isAuthenticated: state => {
    return state.refreshToken !== null;
  },
};

export default {
  state,
  mutations,
  actions,
  getters
};
