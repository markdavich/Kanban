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
    tasks: {}
  },
  mutations: {
    setTasksByListId(state, payload) {
      Vue.set(state.tasks, payload.listId, payload.tasks);
    }
  },
  actions: {
    async createNewTask({ commit, dispatch }, task) {
      try {
        let endPoint = `${task.list}/tasks`
        let axiosRes = await api.post(endPoint, task);
        if (axiosRes) {
          dispatch("getTasksByListId", task.list);
        }
      } catch (error) {
        console.error("store-modules > tasks.js > actions > createNewTask()")
      }
    },

    async getTasksByListId({ commit, dispatch }, listId) {
      try {
        let endPoint = `${listId}/tasks`;
        let axiosRes = await api.get(endPoint);
        let tasks = axiosRes.data;

        let payload = {
          tasks: tasks,
          listId: listId
        };

        commit("setTasksByListId", payload);
      } catch (error) {
        console.error("store-modules > tasks.js > actions > getTasksByListId()")
      }
    },

    async editTask({ dispatch }, task) {
      try {
        let endPoint = `${task.list}/tasks/${task._id}`
        await api.put(endPoint, task)
        dispatch('getTasksByListId', task.list)
      } catch (error) {
        console.error("store-modules > tasks.js > actions > editTask()")
      }
    },

    async moveTask({ commit, dispatch }, movedTask) {
      try {
        let endPoint = `${movedTask.list}/tasks/${movedTask._id}`
        await api.put(endPoint, movedTask)
      } catch (error) {
        console.error("store-modules > tasks.js > actions > moveTask()")
      }
    },

    async deleteTask({ dispatch }, task) {
      let taskId = task._id
      let listId = task.list
      let endPoint = `${listId}/tasks/${taskId}`
      try {
        await api.delete(endPoint)
        dispatch('getTasksByListId', listId)
      } catch (error) {
        console.error("store-modules > tasks.js > actions > deleteTask()")
      }
    }
  }
}