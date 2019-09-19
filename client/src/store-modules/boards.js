import router from "../router";
import AuthService from "../AuthService";
import Axios from "axios"
import template from "./template";
import Vue from "vue";


const CONTROLLER_ROUTE = 'api/boards'
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
    boards: [],
    activeBoard: {}
  },
  mutations: {
    setActiveBoard(state, board) {
      state.activeBoard = board;
    },
    setBoards(state, boards) {
      state.boards = boards;
    },
  },
  actions: {
    async getBoards({ commit, dispatch }) {
      try {
        let axiosRes = await api.get("");
        let boards = axiosRes.data;
        commit("setBoards", boards);
      } catch (error) { }
    },
    async getBoardById({ dispatch, commit }, boardId) {
      try {
        let endPoint = `${boardId}`;
        let axiosRes = await api.get(endPoint, boardId);
        let board = axiosRes.data;
        commit("setActiveBoard", board);
      } catch (error) {
        router.push("/");
      }
    },
    async addBoard({ commit, dispatch }, boardData) {
      try {
        let axiosRes = await api.post("", boardData);
        if (axiosRes) {
          dispatch("getBoards");
        }
      } catch (error) { }
    },

    async editBoard({ commit, dispatch }, board) {
      try {
        let endPoint = `${board._id}`
        let axiosRes = await api.put(endPoint, board)
        let edit = axiosRes.data
        commit('setActiveBoard', edit)
        dispatch('getBoards')
      } catch (error) {
        console.error('store-modules > boards.js > actions: editBoard()')
      }
    }
  }
}