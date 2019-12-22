import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter);

const guard = (to, from, next) => {
  const token = localStorage.getItem("token");
  // console.log(to);

  if (token) {
    next();
  } else {
    Vue.$store.dispatch("getEntryPath", to.path);
    next("/login");
  }
};

const routes = [
  {
    path: '/',
    name: 'home',
    beforeEnter: guard,
    component: Home
  },
  {
    path: '/about',
    beforeEnter: guard,
    name: 'about',
    component: () => import('../views/About.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
