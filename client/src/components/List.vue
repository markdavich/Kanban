<template>
  <div class="col-3 list mr-3">
    <!-- TITLE -->
    <div class="input-group mb-3">
      <click-edit :initialValue="boardList.title" :placeHolder="'List Title'" :enterKeyPress="titleChange">
      </click-edit>
      <div class="input-group-append">
        <div class="dropdown">
          <button class="btn btn-outline-secondary" type="button" data-toggle="dropdown">
            <i class="fas fa-caret-down"></i>
          </button>
          <div class="dropdown-menu">
            <a v-show="isAllowed(boardList.user)" class="dropdown-item" @click="deleteList">Remove List</a>
            <a class="dropdown-item">Another action</a>
            <a class="dropdown-item">Something else here</a>
          </div>
        </div>
      </div>
    </div>

    <!-- DRAGGABLE CONTAINER -->
    <draggable v-model="myList" group="myGroup" class="list-group" :move="checkMove" @start="startDrag" @add="onDrop">
      <transition-group type="transition" :name="'flip-list'">
        <task :data-list="boardList._id" class="list-group-item" v-for="task in myList" :task="task" :key="task._id">
          {{ task.description }}
        </task>
      </transition-group>
    </draggable>
    <p class="new-task" @click="createNewTask">
      <i class="fas fa-tasks"> </i> New Task
    </p>
  </div>
</template>

<script>
  import Task from "./Task";
  import draggable from "vuedraggable";
  import ClickEdit from "./ClickEdit";
  export default {
    name: "list",
    props: {
      boardList: { type: Object, required: true }
    },
    components: {
      draggable,
      ClickEdit,
      Task
    },
    data() {
      return {
        editable: true,
        isDragging: false,
        delayedDragging: false
      };
    },
    methods: {
      checkMove(event, originalEvent) {
        // Stuff
      },
      endDrag(e) {
        // debugger
      },
      startDrag(event) { },
      onDrop(event) {
        let sourceList = event.item.dataset.list; // For documentaion
        let targetList = this.boardList._id;

        let newIndex = event.newDraggableIndex
        let task = this.$store.state.Tasks.tasks[targetList][newIndex]
        task.list = targetList

        this.$store.dispatch('moveTask', task)
      },

      createNewTask() {
        let task = {
          list: this.boardList._id,
          user: this.userId(), // userId() is a mixin. SEE main.js (client)
          board: this.boardList.board
        };
        this.$store.dispatch("createNewTask", task);
      },

      titleChange(newValue) {
        let newList = this.boardList
        newList.title = newValue
        this.$store.dispatch('editList', newList)
      },
      deleteList() {
        let list = this.boardList;

        this.$store.dispatch("deleteList", list)

        // this.$store.dispatch("deleteListById", list._id);
        // this.$store.dispatch("getLists", list.board);

        // this.$store.state.Lists.lists.forEach(element => {
        //   let listId = element._id;
        //   this.$store.dispatch("getTasksByListId", listId);
        // });
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
      myList: {
        get() {
          let tasks = this.$store.state.Tasks.tasks[this.boardList._id] || [];
          return tasks;
        },
        set(value) {
          let listId = this.boardList._id;

          let payload = {
            listId: listId,
            tasks: value
          };

          this.$store.commit("setTasksByListId", payload);
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
    /* border: solid red 1px; */
    min-height: 50px;
  }

  .list-group-item {
    cursor: move;
  }

  .list-group-item i {
    cursor: pointer;
  }
</style>