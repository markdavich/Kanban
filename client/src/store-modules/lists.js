import router from "../router";
import AuthService from "../AuthService";
import Axios from "axios"
import template from "./template";
import Vue from "vue";


const CONTROLLER_ROUTE = 'api/lists'
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
    lists: []
  },
  mutations: {
    setLists(state, lists) {
      // Check for deleted list id in tasks
      state.lists = lists;
    }
  },
  actions: {
    async createList({ dispatch }, list) {
      try {
        let axiosRes = await api.post('', list);
        if (axiosRes) {
          dispatch("getLists", list.board);
        }
      } catch (error) { }
    },
    async getLists({ commit }, boardId) {
      let endPoint = `boards/${boardId}`;
      try {
        let axiosRes = await api.get(endPoint);
        let lists = axiosRes.data;
        commit("setLists", lists);
      } catch (error) { }
    },
    async deleteListById({ dispatch }, listId) {
      try {
        let endPoint = `${listId}`;
        let axiosRes = await api.delete(endPoint);
      } catch (error) { }
    }
  }
}