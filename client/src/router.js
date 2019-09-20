import Vue from "vue";
import Router from "vue-router";
import Store from "./store.js";
import Boards from "./views/Boards.vue";
import Board from "./views/Board.vue";
import Login from "./views/Login.vue";
import store from "./store.js";

Vue.use(Router, Store);

let router = new Router({
  routes: [
    {
      path: "/",
      name: "boards",
      component: Boards
    },
    {
      path: "/board/:boardId",
      name: "board",
      props: true,
      component: Board,
      beforeEnter(to, from, next) {
        store.commit('setActiveBoard', {})
        next()
      }
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      beforeEnter(to, from, next) {
        let s = Store;
        if (from.name != "login") {
          s.dispatch("logout");
        }
        return next();
      }
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});
export default router;
