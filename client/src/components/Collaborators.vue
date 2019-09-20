<template>
  <form class="collaborator-form">
    <div class="form-group">
      <label for="e-mail">Collaborator Email</label>
      <input type="text" class="form-control" id="e-mail" placeholder="e-Mail">
    </div>

    <ul class="collaborators">
      <collaborators v-for="collaborator in collaborators" :key="collaborator._id" :collaborator="collaborator">
      </collaborators>
    </ul>

    <div class="button-container">
      <button type="submit" class="btn btn-primary">Save</button>
      <button type="submit" class="btn btn-primary">Cancel</button>
    </div>
  </form>
</template>


<script>
  export default {
    name: 'collaborator',
    props: {
      cancelCallBack: { type: Function }
    },
    computed: {
      boardId() {
        let result = this.$store.state.Boards.activeBoard._id
      },
      collaborators() {
        let result = this.$store.state.Collaborators.collaborators[this.boardId]
      }
    },
    data() {
      return {}
    },
    methods: {}
  }
</script>


<style scoped>
  .button-container {
    display: flex;
    justify-content: flex-end;
    align-content: center;
  }
</style>