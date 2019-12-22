
//TODO fix the api after new container version
const state = {
  items: [],
};

const mutations = {
  LOAD_TODO (state, items) {
    state.items.splice(0, state.items.length);
    state.items.push(...items);
  },
  REMOVE_TODO (state, item) {
    const index = state.items.indexOf(item);
    if (index > -1) {
      state.items.splice(index, 1);
    }
  },
  EDIT_TODO_TITLE (state, {item, title}) {
    item.title = title;
  },
  EDIT_TODO_DONE (state, {item, done}) {
    item.done = done;
  }
};
import Vue from 'vue'
const actions = {
  addTodoItem({ dispatch }, item) {
    return Vue.axios.post("/api/todo", item)
      .then(() => {
        dispatch("loadTodoList")
      }).catch(() => {
        dispatch("failMessageSnackbar", "addFailMsg");
      });
  },
  loadTodoList({ dispatch, commit }) {
    return Vue.axios.get("/api/todo")
      .then(res => {
        commit("LOAD_TODO", res.data.todos);
      }).catch(() => {
        dispatch("failMessageSnackbar", "loadFailMsg");
      });
  },
  removeTodoItem({ dispatch, commit }, item) {
    return Vue.axios.post(`/api/todo/${item.id}/delete`).then(() => {
      commit("REMOVE_TODO", item);
    }).catch(() => {
      dispatch("failMessageSnackbar", "deleteFailMsg");
    });
  },
  editTodoTitle({ dispatch, commit }, {item, title}) {
    return Vue.axios.post(`/api/todo/${item.id}`, {title: title, done: item.done}).then(() => {
      commit("EDIT_TODO_TITLE", {item, title});
    }).catch(() => {
      dispatch("failMessageSnackbar", "editTitleFailMsg");
    });
  },
  editTodoDone({ dispatch, commit }, {item, done}) {
    return Vue.axios.post(`/api/todo/${item.id}`, {title: item.title, done: done}).then(() => {
      commit("EDIT_TODO_DONE", {item, done});
    }).catch(() => {
      dispatch("failMessageSnackbar", "editDoneFailMsg");
    });
  }


};

const getters = {
  todoItems: state => {
    return state.items;
  },
};

export default {
  state,
  mutations,
  actions,
  getters
};
