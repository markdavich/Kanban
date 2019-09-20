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
    collaborators : {
      // board_1_id: ['array of collaborators'],
      // board_2_id: ['array of collaborators']
    }
  },
  mutations: {
    setCollaborators(state, payload) {
      Vue.set(state.collaborators, payload.boardId, payload.collaborators)
    }
  },
  actions: {
    async getCollaborators({ commit }, boardId) {
      try {
        let endPoint = `${boardId}/collaborators`
        let axiosResponse = await api.get(endPoint)
        let collaborators = axiosResponse.data

        let payload = {
          boardId: boardId,
          collaborators: collaborators
        }

        commit('setCollaborators', payload)
      } catch (error) {
        console.error('store-modules > template.js > actions: setCollaborators()')
      }
    },

    async createCollaborator({dispatch}, payload) {
      try {
        let boardId = payload.boardId
        let collaborator = payload.collaborator
        let endPoint = `${boardId}/collaborators`
        
        await api.post(endPoint, collaborator)
        
        dispatch('getCollaborators', boardId)
      } catch (error) {
        console.error('store-modules > template.js > actions: createCollaborators()')
      }
    },

    async deleteCollaborator({dispatch}, payload) {
      try {
        let boardId = payload.board
        let collaboratorId = payload.collaborator._id
        let endPoint = `${boardId}/collaborators/${collaboratorId}`

        await api.delete(endPoint)

        dispatch('getCollaborators', boardId)
      } catch (error) {
        console.error('store-modules > template.js > actions: deleteCollaborators()')
      }
    },

    async editCollaborator({dispatch}, payload) {
      try {
        let boardId = payload.board
        let collaboratorId = payload.collaboratorId
        let collaborator = payload.collaborator
        let endPoint = `${boardId}/collaborators/${collaboratorId}`
        await api.put(endPoint, collaborator)
        dispatch('getCollaborators', boardId)
      } catch (error) {
        console.error('store-modules > template.js > actions: editCollaborators()')
      }
    }
  }
}