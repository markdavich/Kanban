<template>
  <div class="container-fluid">
    <div class="boards">
      <h4> Welcome to your personal Kabana</h4>
      <form @submit.prevent="addBoard">
        <input type="text" placeholder="title" v-model="newBoard.title" required>
        <input type="text" placeholder="description" v-model="newBoard.description">
        <button class="btn btn-primary" type="submit">Create Board</button>
      </form>
      <div v-for="board in boards" :key="board._id">
        <router-link id="boardTitles" :to="{name: 'board', params: {boardId: board._id}}"><i
            class="far fa-folder-open"></i>
          {{board.title}}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "boards",
    mounted() {
      this.$store.dispatch("getBoards");
    },
    data() {
      return {
        newBoard: {
          title: "",
          description: ""
        }
      };
    },
    computed: {
      boards() {
        return this.$store.state.boards;
      }
    },
    methods: {
      addBoard() {
        this.$store.dispatch("addBoard", this.newBoard);
        this.newBoard = { title: "", description: "" };
      }
    }
  };
</script>
<style scoped>
  h4 {
    margin-top: 3px;
  }

  /* .boards {
    background-image: url('https://images.unsplash.com/photo-1446923201163-edc1e4b2d85f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80');
    min-height: 91vh;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  } */
</style>