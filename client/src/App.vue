<template>
  <div id="app">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
      integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" crossorigin="anonymous">
    <nav class="navbar navbar-light bg-light justify-content-between">
      <a class="navbar-brand"><i class="fab fa-kickstarter-k"></i>anban <i class="fas fa-umbrella-beach"></i>
        <i class="fab fa-kickstarter-k"></i>abana</a>

      <form class="form-inline">
        <i class="fas fa-sign-out-alt"></i>
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