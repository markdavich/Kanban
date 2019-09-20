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
      // state.lists = lists;
      Vue.set(state, 'lists', lists)
    }
  },
  actions: {
    async createList({ dispatch }, list) {
      try {
        let axiosRes = await api.post('', list);
        if (axiosRes) {
          dispatch("getLists", list.board);
        }
      } catch (error) {
        console.error('store-modules > lists.js > actions > createList()')
      }
    },
    async getLists({ commit, dispatch, state }, boardId) {
      let endPoint = `boards/${boardId}`;
      try {
        let axiosRes = await api.get(endPoint);
        let lists = axiosRes.data;

        commit("setLists", lists);

        state.lists.forEach(element => {
          let listId = element._id;
          dispatch("getTasksByListId", listId);
        });

      } catch (error) {
        console.error('store-modules > lists.js > actions > getLists()')
      }
    },
    async deleteListById({ dispatch }, listId) {
      try {
        let endPoint = `${listId}`;
        await api.delete(endPoint);
      } catch (error) {
        console.error('store-modules > lists.js > actions > deleteListById()')
      }
    },

    async deleteList({ commit, dispatch }, list) {
      try {
        let listId = list._id
        let boardId = list.board

        let endPoint = `${listId}`;
        await api.delete(endPoint);

        dispatch("getLists", boardId);
      } catch (error) {
        console.error('store-modules > lists.js > actions > deleteList()')
      }
    },

    async editList({ dispatch, commit }, list) {
      try {
        let endPoint = `${list._id}`
        await api.put(endPoint, list)

        dispatch('getLists', list.board)
      } catch (error) {
        console.error('store-modules > lists.js > actions > editList()')
      }
    }
  }
}