<template>
  <!-- this is our title for tasks -->
  <div class="task">
    <div class="input-group mb-3">
      <click-edit class="task-edit" :initialValue="''" :placeHolder="'Task...'" :enterKeyPress="clickEdit">
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
    <div>
      <comment v-for="comment in task.comments" :key="comment._id" :comment="comment">comments</comment>
    </div>
  </div>
</template>


<script>
  import Comment from "./Comment.vue"
  import ClickEdit from "./ClickEdit"
  export default {
    name: 'task',
    components: {
      ClickEdit,
      Comment
    },
    props: {
      task: { type: Object }
    },
    data() {
      return {}
    },
    computed: {},
    methods: {
      deleteTask() {
        alert('Task.vue methods: deleteTask() not implemented\n\nsave the comment to database')
      },
      addComment() {
        let comment = {
          user: this.userId,
          task: this.task._id,
          board: this.task.board,
          list: this.task.list
        }
        this.$store.dispatch("createComment", comment)
        alert('Task.vue methods: addComment() not implemented\n\nsave the comment to database')
      },
      clickEdit(newValue) {
        alert('Task.vue methods: clickEdit() not implemented\n\nsave the task description to database')
      }
    },
  }
</script>


<style scoped>
  .task-edit {
    font-size: 1.1em;
    background-color: rgba(211, 211, 211, 0);
  }
</style>