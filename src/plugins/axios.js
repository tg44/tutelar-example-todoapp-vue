/* eslint-disable no-unused-vars */
"use strict";

import Vue from "vue";
import axios from "axios";

// import store from "../store/store";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';

// Token could be accessed from Vuex store - need manual refresh though!!
// axios.defaults.headers.common["Authorization"] = localStorage.getItem("token");

axios.defaults.headers.post["Content-Type"] = "application/json";

let config = {
  baseURL: process.env.VUE_APP_BASE_URL
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    // Token should be attached to every outgoing request here!
    let token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

Plugin.install = function(Vue, options) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    }
  });
};

export default Plugin;
