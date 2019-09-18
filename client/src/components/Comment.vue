<template>
  <div class="comment">
    <div class="user">{{ authorInitial }}</div>
    <click-edit
      class="comment-edit"
      :initialValue="comment.description"
      :placeHolder="'Comment...'"
      :enterKeyPress="submitEdit"
    ></click-edit>
    <div class="delete" v-show="isAllowed(comment.user)" @click="deleteComment">X</div>
  </div>
</template>

<script>
  import ClickEdit from "./ClickEdit";
  export default {
    name: "comment",
    props: {
      comment: { type: Object }
    },
    methods: {
      authorInitial() {
        let result = task.user.name.charAt(0).toUpperCase;
      },
      submitEdit(newValue) {
        alert(
          'Comment.vue methods: submitEdit(newValue) NOT IMPLEMENTED\n\nThis should set the comment "description" to "newValue"'
        );
      },
      deleteComment() {
        alert(
          'Comment.vue methods: deleteComment() NOT IMPLEMENTED\n\nThis should delete a comment'
        );
      }
     }
  };
</script>

<style scoped>
  .comment {
    display: inline-flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
  }

  .user {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 23px !important;
    width: 23px !important;
    font-size: 1.3em;
    font-weight: bold;
    border-radius: 50%;
    border: solid grey 1px;
  }

  .delete {
    cursor: pointer;
    color: red;
    display: none;
  }

  .delete:hover {
    display: inline-block;
  }

  .comment-edit {
    margin-left: 5px;
    margin-right: 5px;
    flex-grow: 6;
    font-size: 0.75em;
    background-color: transparent;
    color: rgb(65, 65, 65);
  }

  .comment-edit:hover + .delete {
    display: inline-block;
  }
</style>
