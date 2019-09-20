<template>
  <form class="collaborator-form">
    <!-- <div class="form-group">
      <label for="e-mail">Collaborator Email</label>
      <input type="text" class="form-control" id="e-mail" placeholder="e-Mail">
    </div> -->

    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text">Collaborator Email</span>
      </div>
      <input v-model="email" type="text" class="form-control" placeholder="e-Mail">
      <div class="input-group-append">
        <button v-show="isEmail" class="btn btn-outline-secondary" type="button">Add</button>
      </div>
    </div>

    <ul class="collaborators">
      <collaborators v-for="collaborator in collaborators" :key="collaborator._id" :collaborator="collaborator">
      </collaborators>
    </ul>

    <div class="button-container">
      <button @click="close" class="btn btn-primary">Ok</button>
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
      },
      emails() {

        let users = this.$store.state.Auth.users

        let emailArray = users.map(user => {
          return user.email
        })

        let usersSet = new Set(emailArray)

        return usersSet
      },
      isEmail() {
        let result = this.emails.has(this.email)
        return result
      }
    },
    data() {
      return {
        email: ''
      }
    },
    methods: {
      close() {
        this.cancelCallBack()
      }
    }
  }
</script>


<style scoped>
  .button-container {
    display: flex;
    justify-content: flex-end;
    align-content: center;
  }
</style>