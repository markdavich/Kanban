<template>
  <div :style="backgroundImg" class="container-fluid page-img">
    <div id="app">
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
        integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" crossorigin="anonymous">
      <nav id="navColor" class="navbar shadow p-3 mb-2 rounded navbar-light bg-light justify-content-between">
        <a class="navbar-brand"><i id="theK" class="fab fa-kickstarter-k"></i>anban
          <i id="theK" class="fab fa-kickstarter-k"></i>abana <i class="fas fa-umbrella-beach"></i></a>

        <form class="form-inline">
          <button v-show="isBoardPage" class="btn btn-primary" @click="createList">
            <i class="fas fa-clipboard-list"></i> New List
          </button>

          <router-link id="log-out" v-show="!isLogin" to="/login"> logout <i class="fas fa-sign-out-alt"></i>
          </router-link>

        </form>
      </nav>

      <router-view />
    </div>
  </div>
</template>

<script>
  export default {
    name: "App",
    computed: {
      backgroundImg() {
        let url = ''
        let page = this.$route.name

        switch (page) {

          case "boards":
            url = "./Images/Boards.jpg"
            break
          case "board":
            url = './Images/board.jpg'
            break
          default:
            url = "./Images/login.jpg"
        }
        // return `'${url}'`
        let result = {
          backgroundImage: `url('${url}')`
        }
        return result
      },
      isBoardPage() {
        let result = this.$route.name == "board"
        return result
      },
      isLogin() {
        let result = (this.$route.name == "login")
        return result
      }
    },
    methods: {
      createList() {
        this.$store.dispatch("createList", this.getList());
      },
      getList() {
        let result = {
          title: "",
          user: this.userId, // userId is a mixin in main.js (client)
          board: this.$route.params.boardId
        };
        return result;
      }
    },
  };

</script>

<style>
  #log-out {
    margin-left: 5px;
  }

  .page-img {
    min-height: 100vh !important;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }

  #app {}

  #theK {
    transform: rotate(-10deg);
  }

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

  #navColor {
    background-image: linear-gradient(to right, rgba(87, 153, 240, 0.473), rgba(244, 239, 189, 0.541)) !important;
    padding: 10px;
    border: 1px solid #77a9ff54;
    box-shadow: 2px 4px 7px rgb(18, 85, 85);
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