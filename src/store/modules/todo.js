
//TODO fix the names!
//TODO fix the api after new container version
const state = {
  items: [],
};

const mutations = {
  LOAD (state, items) {
    state.items.splice(0, state.items.length);
    state.items.push(...items);
  },
  REMOVE (state, item) {
    const index = this.items.indexOf(item);
    if (index > -1) {
      this.items.splice(index, 1);
    }
  },
  EDIT_TITLE (state, {item, title}) {
    item.title = title;
  },
  EDIT_DONE (state, {item, done}) {
    item.done = done;
  }
};
import Vue from 'vue'
const actions = {
  addNewItem({ dispatch }, item) {
    return Vue.axios.post("/api/todo", item)
      .then(() => {
        dispatch("load")
      }).catch(() => {
        dispatch("failMessageSnackbar", "addFailMsg");
      });
  },
  load({ dispatch, commit }) {
    return Vue.axios.get("/api/todo")
      .then(res => {
        commit("LOAD", res.data.todos);
      }).catch(() => {
        dispatch("failMessageSnackbar", "loadFailMsg");
      });
  },
  remove({ dispatch, commit }, item) {
    return Vue.axios.delete(`/api/todo/${item.id}`).then(() => {
      commit("REMOVE", item);
    }).catch(() => {
      dispatch("failMessageSnackbar", "deleteFailMsg");
    });
  },
  editTitle({ dispatch, commit }, {item, title}) {
    return Vue.axios.post(`/api/todo/${item.id}`, {title: title, done: item.done}).then(() => {
      commit("EDIT_TITLE", {item, title});
    }).catch(() => {
      dispatch("failMessageSnackbar", "editTitleFailMsg");
    });
  },
  editDone({ dispatch, commit }, {item, done}) {
    return Vue.axios.post(`/api/todo/${item.id}`, {title: item.title, done: done}).then(() => {
      commit("EDIT_DONE", {item, done});
    }).catch(() => {
      dispatch("failMessageSnackbar", "editDoneFailMsg");
    });
  }


};

const getters = {
  items: state => {
    return state.items;
  },
};

export default {
  state,
  mutations,
  actions,
  getters
};
