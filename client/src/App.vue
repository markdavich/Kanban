<template>
  <div id="app">
    <nav class="navbar navbar-light bg-light justify-content-between">
      <a class="navbar-brand">Kanban</a>

      <form class="form-inline">
        <router-link v-show="!isLogin" to="/login">logout</router-link>

      </form>
    </nav>
    <router-view />
  </div>
</template>

<script>
  export default {
    name: "App",
    computed: {
      isLogin() {
        let result = this.$route.name == "login"
        return result
      }
    }
  };

</script>

<style>
  :root {
    --root-color: red;
    --list-border-color: grey;
    --list-border-size: 2px;
    --list-border-radius: 10px;
    --list-background-color: var(--root-color);
  }

  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }
</style>