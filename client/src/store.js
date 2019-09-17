import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import router from "./router";
import AuthService from "./AuthService";

Vue.use(Vuex);

//Allows axios to work locally or live
let base = window.location.host.includes("localhost:8080")
  ? "//localhost:3000/"
  : "/";

let api = Axios.create({
  baseURL: base + "api/",
  timeout: 3000,
  withCredentials: true
});

export default new Vuex.Store({
  state: {
    user: {},
    boards: [],
    lists: [],
    tasks: {},
    activeBoard: {}
  },
  mutations: {
    setTasksByListId(state, payload) {
      Vue.set(state.tasks, payload.listId, payload.tasks);
    },
    setLists(state, lists) {
      // Check for deleted list id in tasks
      state.lists = lists;
    },
    setUser(state, user) {
      state.user = user;
    },
    setBoards(state, boards) {
      state.boards = boards;
    }
  },
  actions: {
    async createNewTask({ commit, dispatch }, task) {
      try {
        let axiosRes = await api.post("tasks", task);
        if (axiosRes) {
          dispatch("getTasksByListId", task.list);
        }
      } catch (error) {
        debugger;
      }
    },

    async getTasksByListId({ commit, dispatch }, listId) {
      try {
        let endPoint = `lists/${listId}/tasks`;
        let axiosRes = await api.get(endPoint);
        let tasks = axiosRes.data;

        let payload = {
          tasks: tasks,
          listId: listId
        };

        commit("setTasksByListId", payload);
      } catch (error) {
        debugger;
      }
    },

    async createList({ dispatch }, list) {
      try {
        let endPoint = `lists`;
        let axiosRes = await api.post(endPoint, list);
        if (axiosRes) {
          dispatch("getLists", list.board);
        }
      } catch (error) { }
    },
    async getLists({ commit }, boardId) {
      let endPoint = `lists/boards/${boardId}`;
      try {
        let axiosRes = await api.get(endPoint);
        let lists = axiosRes.data;
        commit("setLists", lists);
      } catch (error) { }
    },

    //#region -- AUTH STUFF --
    async register({ commit, dispatch }, creds) {
      try {
        let user = await AuthService.Register(creds);
        commit("setUser", user);
        router.push({ name: "boards" });
      } catch (e) {
        console.warn(e.message);
      }
    },
    async login({ commit, dispatch }, creds) {
      try {
        let user = await AuthService.Login(creds);
        commit("setUser", user);
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
    //#endregion

    //#region -- BOARDS --
    async getBoards({ commit, dispatch }) {
      try {
        let axiosRes = await api.get("boards");
        let boards = axiosRes.data;
        commit("setBoards", boards);
      } catch (error) { }

      // api.get('boards')
      //   .then(res => {
      //     commit('setBoards', res.data)
      //   })
    },
    async addBoard({ commit, dispatch }, boardData) {
      try {
        let axiosRes = await api.post("boards", boardData);
        if (axiosRes) {
          dispatch("getBoards");
        }
      } catch (error) { }
    }
    //#endregion

    //#region -- LISTS --

    //#endregion
  }
});
