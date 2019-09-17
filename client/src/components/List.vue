<template>
  <div class="col-3 list mr-3">
    <div class="input-group mb-3">
      <click-edit
        :initialValue="'Initial Value'"
        :placeHolder="'Title ---- '"
        :enterKeyPress="titleChange"
      >
      </click-edit>
      <div class="input-group-append">
        <button
          class="btn btn-outline-secondary"
          type="button"
          @click="editList"
        >
          ...
        </button>
      </div>
    </div>

    <draggable
      class="list-group"
      tag="ul"
      v-model="value"
      v-bind="dragOptions"
      :move="onMove"
      @start="isDragging=true"
      @end="isDragging=false"
    >
      <transition-group type="transition" :name="'flip-list'">
        <li class="list-group-item" v-for="task in value" :key="task._id">
          {{ task.description }}
          <span class="badge">{{ task.order }}</span>
        </li>
      </transition-group>
    </draggable>
    <p class="new-task" @click="createNewTask">New Task</p>
  </div>
</template>

<script>
  import draggable from "vuedraggable";
  import ClickEdit from "./ClickEdit";
  export default {
    name: "list",
    props: {
      boardList: { type: Object, required: true }
      // value: { type: Array }
    },
    components: {
      draggable,
      ClickEdit
    },
    data() {
      return {
        editable: true,
        isDragging: false,
        delayedDragging: false
      };
    },
    methods: {
      createNewTask() {
        let task = {
          list: this.boardList._id,
          user: this.userId,
          board: this.boardList.board
        };
        this.$store.dispatch("createNewTask", task);
      },

      titleChange(newValue) {
        alert(`List.vue methods: titleChange(${newValue})`);
      },
      editList() {
        alert("list.vue methods editList() not implemented");
        //make it done
      },
      orderList() {
        this.list = this.list.sort((one, two) => {
          return one.order - two.order;
        });
      },
      onMove({ relatedContext, draggedContext }) {
        const relatedElement = relatedContext.element;
        const draggedElement = draggedContext.element;
        return !relatedElement;
      }
    },
    computed: {
      dragOptions() {
        return {
          animation: 0,
          group: "description",
          disabled: !this.editable,
          ghostClass: "ghost"
        };
      },
      value: {
        get() {
          let tasks = this.$store.state.tasks[this.boardList._id] || [];
          return tasks;
        },
        set(value) {
          // this.$store.commit('updateList', value)
        }
      }
    },
    watch: {
      isDragging(newValue) {
        if (newValue) {
          this.delayedDragging = true;
          return;
        }
        this.$nextTick(() => {
          this.delayedDragging = false;
        });
      }
    },
    mounted() {
      let listId = this.boardList._id;
      this.$store.dispatch("getTasksByListId", listId);
    }
  };
</script>

<style scoped>
  .list {
    padding: 10px;
    border-radius: var(--list-border-radius);
    border: solid var(--list-border-color) var(--list-border-size);
    box-shadow: 4px 4px 12px black;
  }

  .new-task {
    cursor: pointer;
    color: grey;
    float: left;
    font-size: 1.4em;
  }

  .btn-outline-secondary {
    border: none !important;
  }

  .list {
    display: inline-block;
  }

  .flip-list-move {
    transition: transform 0.5s;
  }

  .no-move {
    transition: transform 0s;
  }

  .ghost {
    opacity: 0.5;
    background: #c8ebfb;
  }

  .list-group {
    min-height: 20px;
  }

  .list-group-item {
    cursor: move;
  }

  .list-group-item i {
    cursor: pointer;
  }
</style>
