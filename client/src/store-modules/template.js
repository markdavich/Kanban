import router from "../router";
import AuthService from "../AuthService";
import Axios from "axios"
import template from "./template";
import Vue from "vue";


const CONTROLLER_ROUTE = 'server.use(...) in server -> main.js'
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
  state:{
    generic: {}
  },
  mutations: {
    generic(state, payload) {
      Vue.set(state.generic, payload.key, payload.value)
    }
  },
  actions: {
    async generic({commit}, value) {
      try {
        let endPoint = `${value}`
        let axiosResponse = await api.get(endPoint)
        let data = axiosResponse.data

        commit('generic', data)
      } catch (error) {
        console.error('template.js actions: generic()')
      }
    }
  }
}