import Vue from "vue";
import Vuex from "vuex";

// Store Modules
import Auth from "./store-modules/auth";
import Boards from "./store-modules/boards";
import Collaborators from "./store-modules/collaborators"
import Comments from "./store-modules/comments";
import Lists from "./store-modules/lists";
import Tasks from  "./store-modules/tasks"

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Auth,
    Boards,
    Collaborators,
    Comments,
    Lists,
    Tasks
  }
});
