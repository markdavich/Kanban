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
        <div class="dropdown">
          <button
            class="btn btn-outline-secondary"
            type="button"
            data-toggle="dropdown"
          >
            ...
          </button>
          <div class="dropdown-menu">
            <a class="dropdown-item" @clike="deleteList">Remove List</a>
            <a class="dropdown-item">Another action</a>
            <a class="dropdown-item">Something else here</a>
          </div>
        </div>
      </div>
    </div>

    <!-- <draggable class="list-group" tag="ul" :list="list" v-bind="dragOptions" :move="onMove" @start="isDragging=true"
      @end="isDragging=false" group="tasks"> -->
    <draggable
      v-model="myList"
      group="myGroup"
      class="list-group"
      :move="checkMove"
      @start="startDrag"
      @add="onDrop"
    >
      <transition-group type="transition" :name="'flip-list'">
        <li
          :data-list="boardList._id"
          class="list-group-item"
          v-for="task in myList"
          :key="task._id"
        >
          {{ task.description }}
          <!-- <span class="badge">{{ task.order }}</span> -->
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
      boardList: { type: Object, required: true },
      //  list: [],
      listTasks: []
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
      checkMove(event, originalEvent) {
        // Stuff
      },
      endDrag(e) {
        // debugger
      },
      startDrag(event) {},
      onDrop(event) {
        alert(
          "List.vue methods: onDrop() NOT IMPLEMENTED \n We need to post the new list id to the database"
        );
        let sourceList = event.item.dataset.list;
        let targetList = this.boardList._id;
      },

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
      deleteList() {
        alert("List.vue methods: deleteList() not implemented");
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
      myList: {
        get() {
          let tasks = this.$store.state.tasks[this.boardList._id] || [];
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
      // this.list = this.$store.state.tasks[this.boardList_id]
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
    border: solid red 1px;
    min-height: 20px;
  }

  .list-group-item {
    cursor: move;
  }

  .list-group-item i {
    cursor: pointer;
  }
</style>
