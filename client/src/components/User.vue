<template>
  <div @click.self="cancel" class="user">
    <form class="user-form">
      <div class="form-group">
        <label for="user-name">Name</label>
        <input type="text" class="form-control" id="user-name" placeholder="Enter Your Name">
      </div>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text"></span>Picture</span>
        </div>
        <div class="custom-file">
          <input type="file" class="custom-file-input" id="file-place-hoder">
          <label class="custom-file-label" for="file-place-hoder">Choose file</label>
        </div>
      </div>

      <div class="form-group">
        <label for="color-picker">Color</label>
        <input type="color" id="color-picker" onchange="pickColor($event)" value="#ff0000" style="width:85%;">
      </div>

      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>


<script>
  export default {
    name: 'user',
    props: {
      user: { type: Object },
      closeCallBack: { type: Function, required: true }
    },
    components: {},
    data() {
      return {

      }
    },
    computed: {},
    methods: {
      pickColor(event) {
      },
      cancel() {
        this.closeCallBack()
      }
    },
    mounted() {
      this.isVisible = this.user
    }
  }

</script>


<style scoped>
  .user {
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    position: fixed;
    width: 100vw;
    height: 100vh;
    left: 0px;
    top: 0px;
    background-color: rgba(0, 0, 0, 0.356);
  }

  .user-form {
    z-index: 100;
    padding: 23px;
    border-radius: 15px;
    background-color: rgb(230, 230, 230);
    box-shadow: 4px 4px 23px rgb(51, 51, 51);
  }
</style>