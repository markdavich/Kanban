<template>
  <div>
    <h1 class="board">board.title = {{board.title}}</h1>
    <button class="btn btn-primary">New Task</button>
  </div>
</template>

<script>
  export default {
    name: "board",
    computed: {
      boardId() {
        let result = this.$route.params.boardId
        return result
      },
      board() {
        return (
          //FIXME This does not work on page reload because the boards array is empty in the store
          this.$store.state.boards.find(b => b._id == this.boardId) || {
            title: "Loading..."
          }
        );
      }
    }
  };
</script>