import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import AuthService from "./AuthService";

//Vue.config.productionTip = false

Vue.mixin({
  methods: {
    userId() {
      return this.$store.state.user._id;
    },
    // isAllowed(boardList) {
    //   debugger;
    //   let uid = this.$store.state.user._id;

    //   let collaborators = new Set(
    //     this.$store.state.activeBoard.collaborators.map(c => {
    //       return c._id;
    //     })
    //   );
    //   let result = uid === boardList.user || collaborators.has(uid);
    //   return result;
    // }
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
