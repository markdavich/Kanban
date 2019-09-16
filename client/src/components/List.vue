<template>
  <div class="col-md-3">
    <draggable class="list-group" tag="ul" v-model="list" v-bind="dragOptions" :move="onMove" @start="isDragging=true"
      @end="isDragging=false">
      <transition-group type="transition" :name="'flip-list'">
        <li class="list-group-item" v-for="element in list" :key="element.order">
          <i :class="element.fixed? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'"
            @click=" element.fixed=! element.fixed" aria-hidden="true"></i>
          {{element.name}}
          <span class="badge">{{element.order}}</span>
        </li>
      </transition-group>
    </draggable>
  </div>

  .
  </div>
</template>

<script>
  import draggable from "vuedraggable";
  export default {
    name: 'list',

    components: {
      draggable
    },
    data() {
      return {
        editable: true,
        isDragging: false,
        delayedDragging: false
      };
    },
    methods: {
      orderList() {
        this.list = this.list.sort((one, two) => {
          return one.order - two.order;
        });
      },
      onMove({ relatedContext, draggedContext }) {
        const relatedElement = relatedContext.element;
        const draggedElement = draggedContext.element;
        return (
          (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
        );
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
    }
  };
</script>

<style scoped>
</style>