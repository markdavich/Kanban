<template>
  <!-- this is our title for tasks -->
  <div class="task">
    <div class="input-group mb-3">
      <click-edit class="task-edit" :initialValue="task.description" :placeHolder="'Task...'"
        :enterKeyPress="clickEdit">
      </click-edit>
      <div class="input-group-append">
        <div class="dropdown">
          <button class="btn btn-outline-secondary" type="button" data-toggle="dropdown">
            <i class="fas fa-caret-down"></i>
          </button>

          <div class="dropdown-menu">
            <a v-show="isAllowed(task.user)" class="dropdown-item" @click="deleteTask"><i class="far fa-trash-alt"></i>
              Remove Task</a>
            <a @click="addComment" class="dropdown-item"><i class="far fa-plus-square"></i> Add comment</a>
          </div>
        </div>
      </div>
    </div>

    <!-- this is where the comments go -->
    <div class="container">
      <div class="row">
        <div class="col">
          <comment v-for="comment in comments" :key="comment._id" :comment="comment"></comment>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Comment from "./Comment.vue";
  import ClickEdit from "./ClickEdit";
  export default {
    name: "task",
    components: {
      ClickEdit,
      Comment
    },
    props: {
      task: { type: Object }
    },
    data() {
      return {};
    },
    computed: {
      comments() {
        let comments = this.$store.state.Comments.comments[this.task._id] || [];
        return comments;
      }
    },
    methods: {
      deleteTask() {
        this.$store.dispatch('deleteTask', this.task)
      },
      addComment() {
        let comment = {
          user: this.userId(),
          task: this.task._id,
          board: this.task.board,
          list: this.task.list
        };
        this.$store.dispatch("createComment", comment);
      },
      clickEdit(newValue) {
        let task = {
          _id: this.task._id,
          description: newValue,
          list: this.task.list
        }

        this.$store.dispatch('editTask', task)
      }
    },
    mounted() {
      this.$store.dispatch("getCommentsByTaskId", this.task._id);
    }
  };
</script>

<style scoped>
  .task-edit {
    font-size: 1.1em;
    background-color: rgba(211, 211, 211, 0);
  }
</style>