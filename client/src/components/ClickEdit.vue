<template>
  <input type="text" v-bind:class="[editing ? 'editing' : 'dormant', 'input-group-prepend', 'form-control', 'my-class']"
    v-model="editValue" v-bind:placeholder="placeHolder" v-on:click="click($event)" v-on:keydown="keyDown($event)"
    v-on:focusout="focusOut($event)" v-bind:readonly="!editing" />
</template>

<script>
  export default {
    name: "click-edit",
    props: {
      initialValue: { type: String },
      placeHolder: { type: String },
      enterKeyPress: { type: Function, required: true }
    },
    components: {},
    data() {
      return {
        editValue: "",
        editing: false
      };
    },
    computed: {},
    mounted() {
      this.editValue = this.initialValue;
    },
    methods: {
      cancel(event) {
        window.getSelection().removeAllRanges();
        this.editing = false;
        this.editValue = this.initialValue;

        event.target.blur();
      },
      click(event) {
        event.preventDefault();
        this.editing = true;
        let pos = event.target.value.length;

        let element = event.target;
        // Modern browsers
        if (element.setSelectionRange) {
          element.focus();
          element.setSelectionRange(0, pos);

          // IE8 and below
        } else if (element.createTextRange) {
          var range = element.createTextRange();
          range.collapse(true);
          range.moveEnd("character", pos);
          range.moveStart("character", 0);
          range.select();
        }
      },
      keyDown(event) {
        switch (event.key) {
          case "Enter":
            let newValue = this.editValue
            this.enterKeyPress(this.editValue);
            this.initialValue = newValue
            this.editValue = "";
            this.editing = false;
            event.target.blur();
            break;
          case "Escape":
            this.cancel(event);
            break;
          default:
        }
      },
      focusOut(event) {
        this.cancel(event);
        // this.$el.classList.remove("editing");
        // this.$el.classList.add("dormant");
      }
    }
  };
</script>

<style scoped>
  .click-edit {
    /* width: 100%;
    height: 100%; */
  }

  input {
    font-size: 1.618em;
    /* width: 100%;
    height: 100%; */
  }

  .editing {
    /* border-radius: 2px; */
    /* border: solid rgb(40, 148, 236) 2px; */
    cursor: text;
    /* background-color: rgb(209, 209, 209); */
  }

  .dormant {
    border: none;
    cursor: pointer;
    background-color: transparent;
  }

  textarea {
    resize: none;
    overflow-wrap: break-word;
    overflow: hidden;
  }
</style>