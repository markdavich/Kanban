import router from "../router";
import AuthService from "../AuthService";
import Axios from "axios";
import Vue from "vue";

const CONTROLLER_ROUTE = 'account'
// EXAMPLE: const CONTROLLER_ROUTE = 'api/cars'

let base = window.location.host.includes("localhost:8080")
  ? "//localhost:3000/"
  : "/";

let api = Axios.create({
  baseURL: base + CONTROLLER_ROUTE,
  timeout: 3000,
  withCredentials: true
});

export default {
  state: {
    user: {},
    users: []
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setUsers(state, users) {
      state.users = users
    },
    resetState(state) {
      state.user = {};
    }
  },
  actions: {
    async register({ commit, dispatch }, creds) {
      try {
        let user = await AuthService.Register(creds);
        commit("setUser", user);
        dispatch("getUsers")
        router.push({ name: "boards" });
      } catch (e) {
        console.warn(e.message);
      }
    },
    async login({ commit, dispatch }, creds) {
      try {
        let user = await AuthService.Login(creds);
        commit("setUser", user);
        dispatch("getUsers")
        router.push({ name: "boards" });
      } catch (e) {
        console.warn(e.message);
      }
    },
    async logout({ commit, dispatch }) {
      try {
        let success = await AuthService.Logout();
        if (!success) {
        }
        commit("resetState");
        router.push({ name: "login" });
      } catch (e) {
        console.warn(e.message);
      }
    },

    async getUsers({ commit }) {
      try {
        let endPoint = `users`
        let axiosRes = await api.get(endPoint)
        let users = axiosRes.data
        commit('setUsers', users)
      } catch (error) {
        console.error('store-modules > actions > getUsers()')
      }
    }
  }
};
