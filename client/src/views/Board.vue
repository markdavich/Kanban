<template>
  <div class="container-fluid test">
    <div class="row board-title">
      <click-edit v-if="board.title" :initialValue="board.title" :placeHolder="'Board Title...'"
        :enterKeyPress="changeBoardTitle">
      </click-edit>
    </div>
    <div class="scrolling-wrapper">
      <list v-if="lists" class="list" v-for="list in lists" :boardList="list"></list>
    </div>
  </div>
</template>
<script>
  import List from "../components/List";
  import ClickEdit from "../components/ClickEdit";
  export default {
    name: "board",
    components: {
      List,
      ClickEdit
    },
    computed: {
      lists() {
        return this.$store.state.Lists.lists;
      },
      tasks() {
        return this.$store.state.Tasks.tasks;
      },
      board() {
        //forceUpdate is forcing the view to update on load not recommended all the time
        // if (!this.$store.state.activeBoard.title) {
        //   this.$forceUpdate()
        //   return
        // }
        // let result = this.$store.state.activeBoard
        return this.$store.state.Boards.activeBoard
      },
    },
    mounted() {
      console.log('Board.vue mounted(): try using store-modules/boards.js actions: loadBoard()')
      this.$store.dispatch("getBoardById", this.$route.params.boardId);
      this.$store.dispatch("getLists", this.$route.params.boardId);
      this.$store.state.Lists.lists.forEach(element => {
        let listId = element._id;
        this.$store.dispatch("getTasksByListId", listId);
      });
    },

    methods: {
      getTasksByListId(listId) {
        let result = this.$store.state.Tasks.tasks[listId];
        return result;
      },

      // createList() {
      //   this.$store.dispatch("createList", this.getList());
      // },
      // getList() {
      //   let result = {
      //     title: "",
      //     user: this.userId, // userId is a mixin in main.js (client)
      //     board: this.$route.params.boardId
      //   };
      //   return result;
      // },
      changeBoardTitle(newValue) {
        let board = {
          _id: this.board._id,
          title: newValue
        }

        this.$store.dispatch('editBoard', board)
      }
    }
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
    max-height: 78vh !important;
    min-height: 78vh !important;
  }

  .list {
    display: inline-block !important;
  }

  .test {
    max-height: 75vh !important;
  }
</style>