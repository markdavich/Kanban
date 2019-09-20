import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import AuthService from "./AuthService";
//Vue.config.productionTip = false

import MyModal from './components/Modal.vue'
import Collaborators from './components/Collaborators'
import Collaborator from './components/Collaborator'

Vue.component('my-modal', MyModal);
Vue.component('collaborators', Collaborators);
Vue.component('collaborator', Collaborator);


Vue.mixin({
  methods: {
    userId() {
      return this.$store.state.Auth.user._id;
    },
    isAllowed(creatorId) {
      let uid = this.$store.state.Auth.user._id;
      let boardId = this.$store.state.Boards.activeBoard._id
      let collaborators = this.$store.state.Collaborators.collaborators[boardId] || []
      let collaboratorIds = new Set(
        collaborators.map(c => {
          return c._id;
        })
      );
      let result = uid === creatorId || collaboratorIds.has(uid);
      return result;
    }
  }
});

async function init() {
  let user = await AuthService.Authenticate();
  if (user) {
    store.commit("setUser", user);
  } else {
    router.push({ name: "login" });
  }
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount("#app");
}
init();
