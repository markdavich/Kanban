<template>
  <div v-if="comment" class="comment row d-flex">
    <div class="user">{{ authorInitial() }}</div>
    <click-edit class="comment-edit" :initialValue="comment.description" :placeHolder="'Comment...'"
      :enterKeyPress="submitEdit">
    </click-edit>
    <div v-if="canDelete" class="delete" @click="deleteComment">
      X
    </div>
  </div>
</template>

<script>
  import ClickEdit from "./ClickEdit";
  export default {
    name: "comment",
    props: {
      comment: { type: Object }
    },
    computed: {
      canDelete() {
        let result = this.isAllowed(this.comment.user._id)
        return result
      }
    },
    components: {
      ClickEdit
    },
    methods: {
      authorInitial() {
        let result = this.comment.user.name.charAt(0).toUpperCase();
        return result;
      },
      submitEdit(newValue) {
        let comment = this.comment
        comment.description = newValue
        this.$store.dispatch('editComment', comment)
      },
      deleteComment() {
        this.$store.dispatch('deleteComment', this.comment)
      }
    }
  };
</script>

<style scoped>
  .comment {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    align-content: center;
    justify-content: flex-start;
  }

  .user {
    min-height: 23px !important;
    min-width: 23px !important;
    max-height: 23px !important;
    max-width: 23px !important;

    font-size: 0.95em;
    font-weight: bold;
    border-radius: 50%;
    border: solid rgb(134, 134, 134) 1px;
    color: rgb(70, 70, 70);

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .delete {
    float: right;
    cursor: pointer;
    color: red;
    display: none;
  }

  .delete:hover {
    display: inline-block;
  }

  .comment-edit {
    flex-wrap: wrap;
    margin-left: 5px;
    margin-right: 5px;
    /* flex-grow: 6; */
    font-size: 0.75em;
    background-color: transparent;
    color: rgb(65, 65, 65);
  }

  .comment-edit:hover+.delete {
    display: inline-block;
  }
</style>