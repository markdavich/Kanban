<template>
  <div class="container-fluid">
    <div class="row board-title">
      <h1 class="board">board.title = {{board.title}}</h1>
      <button class="btn btn-primary" @click="createList">New List</button>
    </div>
    <div class="scrolling-wrapper">
      <list class="list" v-for="list in lists" :list="list"></list>
    </div>
  </div>
</template>
<script>
  import List from "../components/List"
  export default {
    name: "board",
    components: {
      List
    },
    computed: {
      boardId() {
        let result = this.$route.params.boardId
        return result
      },
      lists() {

        return this.$store.state.lists
      },
      board() {
        return (
          //FIXME This does not work on page reload because the boards array is empty in the store
          this.$store.state.boards.find(b => b._id == this.boardId) || {
            title: "Loading..."
          }
        );
      }
    },
    mounted() {
      this.$store.dispatch("getLists", this.boardId)
      this.$store.dispatch("getTasks", this.boardId)
    },
    methods: {
      createList() {
        this.$store.dispatch("createList", this.getList())
      },
      getList() {
        let result = {
          title: "",
          user: this.userId, // userId is a mixin in main.js (client)
          board: this.boardId
        }
        return result
      }
    },
  };
</script>
<style scoped>
  .board-title {
    margin-bottom: 10px;
  }

  .scrolling-wrapper {
    overflow-x: scroll !important;
    overflow-y: hidden !important;
    white-space: nowrap !important;
    height: 90vh;
  }

  .list {
    display: inline-block !important;
  }
</style>